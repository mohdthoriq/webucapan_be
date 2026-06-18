/**
 * fileController.ts
 *
 * Handles file uploads (foto & musik) ke Supabase Storage,
 * lalu simpan metadata ke tabel files.
 *
 * Routes:
 *   POST /api/files/upload          → uploadFile   (single file)
 *   POST /api/files/upload/batch    → uploadBatch  (multiple photos, max 10)
 *   GET /api/files/[id]             → getFile
 *   DELETE /api/files/[id]          → deleteFile
 */

import type { Request, Response } from 'express'
import { createClient } from '@supabase/supabase-js'
import { prisma } from '../lib/prisma'
import { ok, created, noContent, badRequest, notFound, handleError } from '../lib/response'

// ─── Supabase client (server-side, service role key) ─────────────────────────

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

// ─── Config ──────────────────────────────────────────────────────────────────

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif']
const ALLOWED_AUDIO_TYPES = ['audio/mpeg', 'audio/mp3', 'audio/aac', 'audio/wav', 'audio/x-m4a', 'audio/mp4']
const MAX_IMAGE_SIZE = 10 * 1024 * 1024   // 10 MB
const MAX_AUDIO_SIZE = 20 * 1024 * 1024   // 20 MB
const MAX_BATCH_COUNT = 10

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getBucket(mimeType: string): 'photos' | 'music' | null {
  if (ALLOWED_IMAGE_TYPES.includes(mimeType)) return 'photos'
  if (ALLOWED_AUDIO_TYPES.includes(mimeType)) return 'music'
  return null
}

function getMaxSize(mimeType: string): number {
  if (ALLOWED_AUDIO_TYPES.includes(mimeType)) return MAX_AUDIO_SIZE
  return MAX_IMAGE_SIZE
}

function sanitizeFileName(name: string): string {
  return name.replace(/[^a-zA-Z0-9.\-_]/g, '_').toLowerCase()
}

async function uploadToStorage(
  buffer: Buffer,
  mimeType: string,
  originalName: string,
): Promise<{ publicUrl: string; storagePath: string }> {
  const bucket      = getBucket(mimeType)!
  const timestamp   = Date.now()
  const storagePath = `${timestamp}_${sanitizeFileName(originalName)}`

  const { error } = await supabase.storage
    .from(bucket)
    .upload(storagePath, buffer, {
      contentType: mimeType,
      upsert: false,
    })

  if (error) throw new Error(`Supabase storage error: ${error.message}`)

  const { data: urlData } = supabase.storage
    .from(bucket)
    .getPublicUrl(storagePath)

  return { publicUrl: urlData.publicUrl, storagePath }
}

// ─── Controllers ─────────────────────────────────────────────────────────────

/**
 * POST /api/files/upload
 * Upload a single file (photo or music).
 * Expects multer memoryStorage middleware to populate req.file
 */
export async function uploadFile(req: Request, res: Response) {
  try {
    const file = req.file
    if (!file) return badRequest(res, 'Field file wajib ada')

    const mimeType = file.mimetype
    const bucket   = getBucket(mimeType)
    if (!bucket) {
      return badRequest(
        res,
        `Tipe file tidak didukung: ${mimeType}. Gunakan JPG/PNG/HEIC untuk foto atau MP3/AAC/WAV untuk musik`,
      )
    }

    if (file.size > getMaxSize(mimeType)) {
      const maxMB = getMaxSize(mimeType) / 1024 / 1024
      return badRequest(res, `Ukuran file melebihi batas ${maxMB}MB`)
    }

    const { publicUrl, storagePath } = await uploadToStorage(file.buffer, mimeType, file.originalname)

    const fileRecord = await prisma.file.create({
      data: {
        file_name:    file.originalname,
        file_url:     publicUrl,
        file_type:    bucket,
        mime_type:    mimeType,
        file_size:    BigInt(file.size),
        storage_path: storagePath,
      },
    })

    return created(res, {
      ...fileRecord,
      file_size: fileRecord.file_size?.toString() ?? null,
    })
  } catch (error) {
    return handleError(res, error)
  }
}

/**
 * POST /api/files/upload/batch
 * Upload multiple photos at once (max 10).
 * Expects multer memoryStorage middleware to populate req.files
 */
export async function uploadBatch(req: Request, res: Response) {
  try {
    const files = req.files as Express.Multer.File[] | undefined

    if (!files || !files.length) return badRequest(res, 'Tidak ada file yang dikirim')
    if (files.length > MAX_BATCH_COUNT) return badRequest(res, `Maksimal ${MAX_BATCH_COUNT} foto`)

    // Validate all files first before uploading any
    for (const file of files) {
      if (!ALLOWED_IMAGE_TYPES.includes(file.mimetype)) {
        return badRequest(res, `File "${file.originalname}" bukan gambar. Hanya JPG/PNG/WEBP/HEIC yang didukung`)
      }
      if (file.size > MAX_IMAGE_SIZE) {
        return badRequest(res, `File "${file.originalname}" melebihi batas 10MB`)
      }
    }

    const results = await Promise.all(
      files.map(async (file) => {
        const { publicUrl, storagePath } = await uploadToStorage(file.buffer, file.mimetype, file.originalname)

        const fileRecord = await prisma.file.create({
          data: {
            file_name:    file.originalname,
            file_url:     publicUrl,
            file_type:    'photos',
            mime_type:    file.mimetype,
            file_size:    BigInt(file.size),
            storage_path: storagePath,
          },
        })

        return {
          ...fileRecord,
          file_size: fileRecord.file_size?.toString() ?? null,
        }
      }),
    )

    return created(res, { files: results, count: results.length })
  } catch (error) {
    return handleError(res, error)
  }
}

/**
 * GET /api/files/[id]
 * Get file metadata by ID.
 */
export async function getFile(req: Request, res: Response) {
  try {
    const id = req.params.id as string
    const file = await prisma.file.findUnique({ where: { id } })
    if (!file) return notFound(res, 'File tidak ditemukan')

    return ok(res, { ...file, file_size: file.file_size?.toString() ?? null })
  } catch (error) {
    return handleError(res, error)
  }
}

/**
 * DELETE /api/files/[id]
 * Delete file record + remove from Supabase Storage.
 */
export async function deleteFile(req: Request, res: Response) {
  try {
    const id = req.params.id as string
    const file = await prisma.file.findUnique({ where: { id } })
    if (!file) return notFound(res, 'File tidak ditemukan')

    // Remove from Supabase Storage if storage_path exists
    if (file.storage_path && file.file_type) {
      const bucket = file.file_type as 'photos' | 'music'
      await supabase.storage.from(bucket).remove([file.storage_path])
    }

    await prisma.file.delete({ where: { id } })

    return noContent(res)
  } catch (error) {
    return handleError(res, error)
  }
}
