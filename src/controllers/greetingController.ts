/**
 * greetingController.ts
 *
 * Handles all business logic for the Greeting resource.
 *
 * Routes (Express.js style):
 *   POST   /api/greetings                    → createGreeting
 *   GET    /api/greetings/[slug]             → getGreetingBySlug
 *   DELETE /api/greetings/[slug]             → deleteGreeting
 *   POST   /api/greetings/[slug]/view        → trackView
 *   POST   /api/greetings/[slug]/share       → trackShare
 */

import type { Request, Response } from 'express'
import { prisma } from '../lib/prisma'
import { ok, created, noContent, badRequest, notFound, handleError } from '../lib/response'
import { generateUniqueSlug, expiresAt } from '../lib/slug'

// ─── Types ──────────────────────────────────────────────────────────────────

type CreateGreetingBody = {
  recipient_name: string
  occasion: string
  message: string
  sender_name: string
  theme_id: string
  music_source: 'library' | 'upload'
  music_id?: string                   // required when music_source = library
  uploaded_music_file_id?: string     // required when music_source = upload
  thumbnail_file_id?: string
  photo_file_ids?: Array<{            // ordered list of uploaded file ids
    file_id: string
    caption?: string
  }>
  settings?: {
    autoplay_music?: boolean
    show_confetti?: boolean
    show_slideshow?: boolean
    allow_download_photo?: boolean
  }
}

// ─── Validation ──────────────────────────────────────────────────────────────

function validateCreateBody(body: CreateGreetingBody): string | null {
  if (!body.recipient_name?.trim()) return 'recipient_name wajib diisi'
  if (!body.occasion?.trim())       return 'occasion wajib diisi'
  if (!body.message?.trim())        return 'message wajib diisi'
  if (!body.sender_name?.trim())    return 'sender_name wajib diisi'
  if (!body.theme_id?.trim())       return 'theme_id wajib diisi'

  if (!['library', 'upload'].includes(body.music_source)) {
    return 'music_source harus library atau upload'
  }
  if (body.music_source === 'library' && !body.music_id) {
    return 'music_id wajib diisi jika music_source = library'
  }
  if (body.music_source === 'upload' && !body.uploaded_music_file_id) {
    return 'uploaded_music_file_id wajib diisi jika music_source = upload'
  }
  if (body.photo_file_ids && body.photo_file_ids.length > 10) {
    return 'Maksimal 10 foto'
  }
  return null
}

// ─── Controllers ─────────────────────────────────────────────────────────────

/**
 * POST /api/greetings
 * Create a new greeting, upload links resolved beforehand (file IDs from fileController).
 */
export async function createGreeting(req: Request, res: Response) {
  try {
    const body: CreateGreetingBody = req.body

    const validationError = validateCreateBody(body)
    if (validationError) return badRequest(res, validationError)

    // Verify theme exists and is active
    const theme = await prisma.theme.findUnique({ where: { id: body.theme_id } })
    if (!theme || !theme.is_active) return badRequest(res, 'Tema tidak ditemukan atau tidak aktif')

    // Verify library music exists if needed
    if (body.music_source === 'library' && body.music_id) {
      const music = await prisma.music.findUnique({ where: { id: body.music_id } })
      if (!music || !music.is_active) return badRequest(res, 'Musik tidak ditemukan atau tidak aktif')
    }

    const slug = await generateUniqueSlug()

    const data: any = {
      slug,
      recipient_name:         body.recipient_name.trim(),
      occasion:               body.occasion.trim(),
      message:                body.message.trim(),
      sender_name:            body.sender_name.trim(),
      theme_id:               body.theme_id,
      music_source:           body.music_source,
      music_id:               body.music_source === 'library' ? (body.music_id || null) : null,
      uploaded_music_file_id: body.music_source === 'upload'  ? (body.uploaded_music_file_id || null) : null,
      thumbnail_file_id:      body.thumbnail_file_id || null,
      status:                 'published',
      expires_at:             expiresAt(),
    }

    if (body.photo_file_ids?.length) {
      data.photos = {
        create: body.photo_file_ids.map((p, index) => ({
          file_id:       p.file_id,
          caption:       p.caption ?? null,
          display_order: index + 1,
        })),
      }
    }

    data.settings = {
      create: {
        autoplay_music:       body.settings?.autoplay_music       ?? true,
        show_confetti:        body.settings?.show_confetti        ?? true,
        show_slideshow:       body.settings?.show_slideshow       ?? true,
        allow_download_photo: body.settings?.allow_download_photo ?? false,
      },
    }

    const greeting = await prisma.greeting.create({
      data,
      include: {
        theme:          true,
        music:          true,
        uploaded_music: true,
        thumbnail:      true,
        photos: {
          include: { file: true },
          orderBy: { display_order: 'asc' },
        },
        settings: true,
      },
    })

    return created(res, {
      greeting,
      link: `${process.env.NEXT_PUBLIC_BASE_URL}/u/${slug}`,
    })
  } catch (error) {
    return handleError(res, error)
  }
}

/**
 * GET /api/greetings/[slug]
 * Public endpoint — returns greeting data for the recipient's landing page.
 * Also checks expiry and active status.
 */
export async function getGreetingBySlug(req: Request, res: Response) {
  try {
    const slug = req.params.slug as string
    const greeting = await prisma.greeting.findUnique({
      where: { slug },
      include: {
        theme: {
          include: {
            theme_effects: {
              include: { effect: true },
            },
          },
        },
        music:          true,
        uploaded_music: true,
        thumbnail:      true,
        photos: {
          include: { file: true },
          orderBy: { display_order: 'asc' },
        },
        settings: true,
      },
    })

    if (!greeting) return notFound(res, 'Ucapan tidak ditemukan')

    // Check expiry
    if (greeting.expires_at && new Date() > greeting.expires_at) {
      return notFound(res, 'Link ucapan ini sudah expired')
    }

    // Check status
    if (greeting.status !== 'published') {
      return notFound(res, 'Ucapan tidak tersedia')
    }

    return ok(res, greeting)
  } catch (error) {
    return handleError(res, error)
  }
}

/**
 * DELETE /api/greetings/[slug]
 * Soft-delete by setting status = 'deleted'.
 * Photos, settings, shares, views cascade on hard delete via Prisma schema.
 */
export async function deleteGreeting(req: Request, res: Response) {
  try {
    const slug = req.params.slug as string
    const existing = await prisma.greeting.findUnique({ where: { slug } })
    if (!existing) return notFound(res)

    await prisma.greeting.update({
      where: { slug },
      data:  { status: 'deleted' },
    })

    return noContent(res)
  } catch (error) {
    return handleError(res, error)
  }
}

/**
 * POST /api/greetings/[slug]/view
 * Track a page view. Increments view_count and logs to greeting_views.
 * Called once when the recipient opens the landing page.
 */
export async function trackView(req: Request, res: Response) {
  try {
    const slug = req.params.slug as string
    const greeting = await prisma.greeting.findUnique({
      where:  { slug },
      select: { id: true, status: true, expires_at: true },
    })

    if (!greeting || greeting.status !== 'published') return notFound(res)
    if (greeting.expires_at && new Date() > greeting.expires_at) return notFound(res, 'Link sudah expired')

    const ip_address = (req.headers['x-forwarded-for'] as string)?.split(',')[0]?.trim()
                    || (req.headers['x-real-ip'] as string)
                    || req.ip
                    || null
    const user_agent = (req.headers['user-agent'] as string) || null
    const referrer   = (req.headers['referer'] as string) || null

    await prisma.$transaction([
      prisma.greetingView.create({
        data: {
          greeting_id: greeting.id,
          ip_address,
          user_agent,
          referrer,
        },
      }),
      prisma.greeting.update({
        where: { id: greeting.id },
        data:  { view_count: { increment: 1 } },
      }),
    ])

    return ok(res, { tracked: true })
  } catch (error) {
    return handleError(res, error)
  }
}

/**
 * POST /api/greetings/[slug]/share
 * Log a share event and increment share_count.
 * Body: { platform: 'whatsapp' | 'instagram' | 'copy' | string }
 */
export async function trackShare(req: Request, res: Response) {
  try {
    const slug = req.params.slug as string
    const body: { platform?: string } = req.body
    const platform = body.platform?.trim()

    if (!platform) return badRequest(res, 'platform wajib diisi')

    const greeting = await prisma.greeting.findUnique({
      where:  { slug },
      select: { id: true, status: true },
    })

    if (!greeting || greeting.status !== 'published') return notFound(res)

    await prisma.$transaction([
      prisma.greetingShare.create({
        data: {
          greeting_id: greeting.id,
          platform,
        },
      }),
      prisma.greeting.update({
        where: { id: greeting.id },
        data:  { share_count: { increment: 1 } },
      }),
    ])

    return ok(res, { tracked: true })
  } catch (error) {
    return handleError(res, error)
  }
}
