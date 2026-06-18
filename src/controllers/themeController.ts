/**
 * themeController.ts
 *
 * Routes:
 *   GET    /api/themes               → listThemes     (public — aktif saja)
 *   GET    /api/themes/[id]          → getTheme       (public)
 *   POST   /api/admin/themes         → createTheme    (admin)
 *   PATCH  /api/admin/themes/[id]    → updateTheme    (admin)
 *   DELETE /api/admin/themes/[id]    → deleteTheme    (admin)
 */

import type { Request, Response } from 'express'
import { prisma } from '../lib/prisma'
import { ok, created, noContent, badRequest, notFound, handleError } from '../lib/response'

// ─── Public ──────────────────────────────────────────────────────────────────

/**
 * GET /api/themes
 * Return all active themes with their effects — used in the form "pilih tema".
 */
export async function listThemes(req: Request, res: Response) {
  try {
    const themes = await prisma.theme.findMany({
      where:   { is_active: true },
      orderBy: { created_at: 'asc' },
      include: {
        theme_effects: {
          include: { effect: true },
        },
      },
    })
    return ok(res, themes)
  } catch (error) {
    return handleError(res, error)
  }
}

/**
 * GET /api/themes/[id]
 * Return a single theme by ID.
 */
export async function getTheme(req: Request, res: Response) {
  try {
    const id = req.params.id as string
    const theme = await prisma.theme.findUnique({
      where:   { id },
      include: {
        theme_effects: {
          include: { effect: true },
        },
      },
    })
    if (!theme) return notFound(res, 'Tema tidak ditemukan')
    return ok(res, theme)
  } catch (error) {
    return handleError(res, error)
  }
}

// ─── Admin ────────────────────────────────────────────────────────────────────

type ThemeBody = {
  id?: string
  name?: string
  emoji?: string
  background_gradient?: string
  confetti_colors?: string[]
  is_active?: boolean
  effect_ids?: string[]   // array of effect IDs to attach
}

/**
 * POST /api/admin/themes
 */
export async function createTheme(req: Request, res: Response) {
  try {
    const body: ThemeBody = req.body

    if (!body.id?.trim())                  return badRequest(res, 'id tema wajib diisi')
    if (!body.name?.trim())                return badRequest(res, 'name wajib diisi')
    if (!body.background_gradient?.trim()) return badRequest(res, 'background_gradient wajib diisi')

    const data: any = {
      id:                  body.id.trim(),
      name:                body.name.trim(),
      emoji:               body.emoji ?? null,
      background_gradient: body.background_gradient.trim(),
      confetti_colors:     body.confetti_colors ?? [],
      is_active:           body.is_active ?? true,
    }

    if (body.effect_ids?.length) {
      data.theme_effects = {
        create: body.effect_ids.map((effect_id) => ({ effect_id })),
      }
    }

    const theme = await prisma.theme.create({
      data,
      include: {
        theme_effects: { include: { effect: true } },
      },
    })

    return created(res, theme)
  } catch (error) {
    return handleError(res, error)
  }
}

/**
 * PATCH /api/admin/themes/[id]
 * Partial update. If effect_ids is provided, replaces all attached effects.
 */
export async function updateTheme(req: Request, res: Response) {
  try {
    const id = req.params.id as string
    const body: ThemeBody = req.body

    const existing = await prisma.theme.findUnique({ where: { id } })
    if (!existing) return notFound(res, 'Tema tidak ditemukan')

    const updateData: any = {
      ...(body.name                !== undefined && { name:                body.name.trim() }),
      ...(body.emoji               !== undefined && { emoji:               body.emoji }),
      ...(body.background_gradient !== undefined && { background_gradient: body.background_gradient.trim() }),
      ...(body.confetti_colors     !== undefined && { confetti_colors:     body.confetti_colors }),
      ...(body.is_active           !== undefined && { is_active:           body.is_active }),
    }

    if (body.effect_ids !== undefined) {
      updateData.theme_effects = {
        deleteMany: {},
        create: body.effect_ids.map((effect_id) => ({ effect_id })),
      }
    }

    const theme = await prisma.theme.update({
      where: { id },
      data: updateData,
      include: {
        theme_effects: { include: { effect: true } },
      },
    })

    return ok(res, theme)
  } catch (error) {
    return handleError(res, error)
  }
}

/**
 * DELETE /api/admin/themes/[id]
 * Soft-delete by setting is_active = false.
 * Hard delete would break existing greetings using the theme.
 */
export async function deleteTheme(req: Request, res: Response) {
  try {
    const id = req.params.id as string
    const existing = await prisma.theme.findUnique({ where: { id } })
    if (!existing) return notFound(res, 'Tema tidak ditemukan')

    await prisma.theme.update({
      where: { id },
      data:  { is_active: false },
    })

    return noContent(res)
  } catch (error) {
    return handleError(res, error)
  }
}
