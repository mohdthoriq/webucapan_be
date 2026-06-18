/**
 * effectController.ts
 *
 * Routes:
 *   GET    /api/effects              → listEffects     (public)
 *   POST   /api/admin/effects        → createEffect    (admin)
 *   PATCH  /api/admin/effects/[id]   → updateEffect    (admin)
 *   DELETE /api/admin/effects/[id]   → deleteEffect    (admin)
 */

import type { Request, Response } from 'express'
import { prisma } from '../lib/prisma'
import { ok, created, noContent, badRequest, notFound, handleError } from '../lib/response'

// ─── Public ──────────────────────────────────────────────────────────────────

/**
 * GET /api/effects
 * List all available effects (used internally, attached to themes).
 */
export async function listEffects(req: Request, res: Response) {
  try {
    const effects = await prisma.effect.findMany({
      orderBy: { name: 'asc' },
      select: {
        id:   true,
        name: true,
        code: true,
      },
    })
    return ok(res, effects)
  } catch (error) {
    return handleError(res, error)
  }
}

// ─── Admin ────────────────────────────────────────────────────────────────────

type EffectBody = {
  name?: string
  code?: string
}

/**
 * POST /api/admin/effects
 * code is the unique identifier used by the frontend to activate an effect
 * e.g. "confetti", "snow", "fireworks", "hearts"
 */
export async function createEffect(req: Request, res: Response) {
  try {
    const body: EffectBody = req.body

    if (!body.name?.trim()) return badRequest(res, 'name wajib diisi')
    if (!body.code?.trim()) return badRequest(res, 'code wajib diisi (contoh: confetti, snow)')

    const effect = await prisma.effect.create({
      data: {
        name: body.name.trim(),
        code: body.code.trim().toLowerCase(),
      },
    })

    return created(res, effect)
  } catch (error) {
    return handleError(res, error)
  }
}

/**
 * PATCH /api/admin/effects/[id]
 */
export async function updateEffect(req: Request, res: Response) {
  try {
    const id = req.params.id as string
    const body: EffectBody = req.body

    const existing = await prisma.effect.findUnique({ where: { id } })
    if (!existing) return notFound(res, 'Effect tidak ditemukan')

    const effect = await prisma.effect.update({
      where: { id },
      data: {
        ...(body.name !== undefined && { name: body.name.trim() }),
        ...(body.code !== undefined && { code: body.code.trim().toLowerCase() }),
      },
    })

    return ok(res, effect)
  } catch (error) {
    return handleError(res, error)
  }
}

/**
 * DELETE /api/admin/effects/[id]
 * Hard delete — ThemeEffect rows cascade via Prisma schema (onDelete: Cascade).
 */
export async function deleteEffect(req: Request, res: Response) {
  try {
    const id = req.params.id as string
    const existing = await prisma.effect.findUnique({ where: { id } })
    if (!existing) return notFound(res, 'Effect tidak ditemukan')

    await prisma.effect.delete({ where: { id } })

    return noContent(res)
  } catch (error) {
    return handleError(res, error)
  }
}
