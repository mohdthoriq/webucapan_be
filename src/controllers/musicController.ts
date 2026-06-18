/**
 * musicController.ts
 *
 * Routes:
 *   GET    /api/music               → listMusic       (public — aktif saja)
 *   GET    /api/music/[id]          → getMusic        (public)
 *   POST   /api/admin/music         → createMusic     (admin)
 *   PATCH  /api/admin/music/[id]    → updateMusic     (admin)
 *   DELETE /api/admin/music/[id]    → deleteMusic     (admin, soft)
 */

import type { Request, Response } from 'express'
import { prisma } from '../lib/prisma'
import { ok, created, noContent, badRequest, notFound, handleError } from '../lib/response'

// ─── Public ──────────────────────────────────────────────────────────────────

/**
 * GET /api/music
 * Return all active music — used in form "pilih musik".
 * Optionally filter by ?category=ulang+tahun
 */
export async function listMusic(req: Request, res: Response) {
  try {
    const category = req.query.category as string | undefined

    const musics = await prisma.music.findMany({
      where: {
        is_active: true,
        ...(category && { category }),
      },
      orderBy: { created_at: 'asc' },
      select: {
        id:               true,
        title:            true,
        file_url:         true,
        duration_seconds: true,
        category:         true,
      },
    })

    return ok(res, musics)
  } catch (error) {
    return handleError(res, error)
  }
}

/**
 * GET /api/music/[id]
 */
export async function getMusic(req: Request, res: Response) {
  try {
    const id = req.params.id as string
    const music = await prisma.music.findUnique({ where: { id } })
    if (!music || !music.is_active) return notFound(res, 'Musik tidak ditemukan')
    return ok(res, music)
  } catch (error) {
    return handleError(res, error)
  }
}

// ─── Admin ────────────────────────────────────────────────────────────────────

type MusicBody = {
  title?: string
  file_url?: string
  duration_seconds?: number
  category?: string
  is_active?: boolean
}

/**
 * POST /api/admin/music
 * Admin adds a new music track to the library.
 * file_url should point to an already-uploaded file in Supabase Storage.
 */
export async function createMusic(req: Request, res: Response) {
  try {
    const body: MusicBody = req.body

    if (!body.title?.trim())    return badRequest(res, 'title wajib diisi')
    if (!body.file_url?.trim()) return badRequest(res, 'file_url wajib diisi')

    const music = await prisma.music.create({
      data: {
        title:            body.title.trim(),
        file_url:         body.file_url.trim(),
        duration_seconds: body.duration_seconds ?? null,
        category:         body.category?.trim() ?? null,
        is_active:        body.is_active ?? true,
      },
    })

    return created(res, music)
  } catch (error) {
    return handleError(res, error)
  }
}

/**
 * PATCH /api/admin/music/[id]
 */
export async function updateMusic(req: Request, res: Response) {
  try {
    const id = req.params.id as string
    const body: MusicBody = req.body

    const existing = await prisma.music.findUnique({ where: { id } })
    if (!existing) return notFound(res, 'Musik tidak ditemukan')

    const music = await prisma.music.update({
      where: { id },
      data: {
        ...(body.title            !== undefined && { title:            body.title.trim() }),
        ...(body.file_url         !== undefined && { file_url:         body.file_url.trim() }),
        ...(body.duration_seconds !== undefined && { duration_seconds: body.duration_seconds }),
        ...(body.category         !== undefined && { category:         body.category?.trim() ?? null }),
        ...(body.is_active        !== undefined && { is_active:        body.is_active }),
      },
    })

    return ok(res, music)
  } catch (error) {
    return handleError(res, error)
  }
}

/**
 * DELETE /api/admin/music/[id]
 * Soft-delete: set is_active = false.
 * Existing greetings using this music won't break.
 */
export async function deleteMusic(req: Request, res: Response) {
  try {
    const id = req.params.id as string
    const existing = await prisma.music.findUnique({ where: { id } })
    if (!existing) return notFound(res, 'Musik tidak ditemukan')

    await prisma.music.update({
      where: { id },
      data:  { is_active: false },
    })

    return noContent(res)
  } catch (error) {
    return handleError(res, error)
  }
}
