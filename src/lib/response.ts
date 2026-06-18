import type { Response } from 'express'

export type ApiResponse<T = unknown> = {
  success: boolean
  data?: T
  message?: string
  errors?: Record<string, string[]>
}

export function ok<T>(res: Response, data: T, status = 200) {
  return res.status(status).json({ success: true, data })
}

export function created<T>(res: Response, data: T) {
  return res.status(201).json({ success: true, data })
}

export function noContent(res: Response) {
  return res.status(204).send()
}

export function badRequest(res: Response, message: string, errors?: Record<string, string[]>) {
  return res.status(400).json({ success: false, message, errors })
}

export function notFound(res: Response, message = 'Data tidak ditemukan') {
  return res.status(404).json({ success: false, message })
}

export function conflict(res: Response, message: string) {
  return res.status(409).json({ success: false, message })
}

export function serverError(res: Response, message = 'Terjadi kesalahan server') {
  return res.status(500).json({ success: false, message })
}

export function handleError(res: Response, error: unknown) {
  console.error('[API Error]', error)

  if (error instanceof Error) {
    // Prisma unique constraint violation
    if ('code' in error && (error as any).code === 'P2002') {
      return conflict(res, 'Data sudah ada, tidak bisa duplikat')
    }
    // Prisma record not found
    if ('code' in error && (error as any).code === 'P2025') {
      return notFound(res)
    }
  }

  return serverError(res)
}
