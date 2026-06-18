/**
 * adminController.ts
 *
 * Admin-only endpoints untuk dashboard statistik.
 *
 * Routes:
 *   GET /api/admin/stats              → getDashboardStats
 *   GET /api/admin/greetings          → listAllGreetings  (paginated)
 *   GET /api/admin/greetings/[slug]   → getGreetingDetail
 */

import type { Request, Response } from 'express'
import { prisma } from '../lib/prisma'
import { ok, handleError } from '../lib/response'

/**
 * GET /api/admin/stats
 * Summary numbers for the admin dashboard.
 */
export async function getDashboardStats(req: Request, res: Response) {
  try {
    const [
      totalGreetings,
      activeGreetings,
      expiredGreetings,
      totalViews,
      totalShares,
      topThemes,
      topMusic,
      recentGreetings,
    ] = await Promise.all([
      prisma.greeting.count(),
      prisma.greeting.count({ where: { status: 'published' } }),
      prisma.greeting.count({
        where: { expires_at: { lt: new Date() }, status: 'published' },
      }),
      prisma.greetingView.count(),
      prisma.greetingShare.count(),

      // Most-used themes
      prisma.greeting.groupBy({
        by:      ['theme_id'],
        _count:  { theme_id: true },
        orderBy: { _count: { theme_id: 'desc' } },
        take:    5,
      }),

      // Most-used library music
      prisma.greeting.groupBy({
        by:      ['music_id'],
        where:   { music_id: { not: null } },
        _count:  { music_id: true },
        orderBy: { _count: { music_id: 'desc' } },
        take:    5,
      }),

      // Last 7 greetings created
      prisma.greeting.findMany({
        orderBy: { created_at: 'desc' },
        take:    7,
        select: {
          slug:           true,
          recipient_name: true,
          occasion:       true,
          status:         true,
          view_count:     true,
          share_count:    true,
          created_at:     true,
        },
      }),
    ])

    // Resolve theme names for topThemes
    const themeIds   = topThemes.map((t) => t.theme_id)
    const themeNames = await prisma.theme.findMany({
      where:  { id: { in: themeIds } },
      select: { id: true, name: true, emoji: true },
    })
    const themeMap = Object.fromEntries(themeNames.map((t) => [t.id, t]))

    // Resolve music titles for topMusic
    const musicIds   = topMusic.map((m) => m.music_id).filter(Boolean) as string[]
    const musicTitles = await prisma.music.findMany({
      where:  { id: { in: musicIds } },
      select: { id: true, title: true },
    })
    const musicMap = Object.fromEntries(musicTitles.map((m) => [m.id, m]))

    return ok(res, {
      summary: {
        total_greetings:   totalGreetings,
        active_greetings:  activeGreetings,
        expired_greetings: expiredGreetings,
        total_views:       totalViews,
        total_shares:      totalShares,
      },
      top_themes: topThemes.map((t) => ({
        theme:  themeMap[t.theme_id],
        count:  t._count.theme_id,
      })),
      top_music: topMusic.map((m) => ({
        music: musicMap[m.music_id!],
        count: m._count.music_id,
      })),
      recent_greetings: recentGreetings,
    })
  } catch (error) {
    return handleError(res, error)
  }
}

/**
 * GET /api/admin/greetings?page=1&limit=20&status=published
 * Paginated list of all greetings for admin table.
 */
export async function listAllGreetings(req: Request, res: Response) {
  try {
    const page   = Math.max(1, parseInt((req.query.page as string) ?? '1'))
    const limit  = Math.min(100, parseInt((req.query.limit as string) ?? '20'))
    const status = (req.query.status as any) ?? undefined

    const queryArgs: any = {
      orderBy: { created_at: 'desc' },
      skip:    (page - 1) * limit,
      take:    limit,
      select: {
        id:             true,
        slug:           true,
        recipient_name: true,
        occasion:       true,
        sender_name:    true,
        status:         true,
        view_count:     true,
        share_count:    true,
        expires_at:     true,
        created_at:     true,
        theme:          { select: { name: true, emoji: true } },
        music:          { select: { title: true } },
        _count:         { select: { photos: true } },
      },
    }
    const countArgs: any = {}

    if (status) {
      queryArgs.where = { status }
      countArgs.where = { status }
    }

    const [greetings, total] = await Promise.all([
      prisma.greeting.findMany(queryArgs),
      prisma.greeting.count(countArgs),
    ])

    return ok(res, {
      greetings,
      pagination: {
        page,
        limit,
        total,
        total_pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    return handleError(res, error)
  }
}

/**
 * GET /api/admin/greetings/[slug]
 * Full detail for admin — includes all views and shares.
 */
export async function getGreetingDetail(req: Request, res: Response) {
  try {
    const slug = req.params.slug as string
    const greeting = await prisma.greeting.findUnique({
      where:   { slug },
      include: {
        theme:          { include: { theme_effects: { include: { effect: true } } } },
        music:          true,
        uploaded_music: true,
        thumbnail:      true,
        photos:         { include: { file: true }, orderBy: { display_order: 'asc' } },
        settings:       true,
        views:          { orderBy: { viewed_at: 'desc' }, take: 50 },
        shares:         { orderBy: { shared_at:  'desc' }, take: 50 },
      },
    })

    if (!greeting) {
      return ok(res, null)
    }

    return ok(res, greeting)
  } catch (error) {
    return handleError(res, error)
  }
}
