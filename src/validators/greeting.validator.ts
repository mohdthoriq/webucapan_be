import { z } from 'zod';

export const greetingIdSchema = z.object({
  params: z.object({
    id: z.string().uuid({ message: 'Format ID harus berupa UUID' }),
  }),
});

export const greetingSlugSchema = z.object({
  params: z.object({
    slug: z
      .string()
      .min(1, { message: 'Slug tidak boleh kosong' })
      .max(8, { message: 'Slug maksimal 8 karakter' }),
  }),
});

export const createGreetingSchema = z.object({
  body: z.object({
    slug: z
      .string()
      .min(1, { message: 'Slug tidak boleh kosong' })
      .max(8, { message: 'Slug maksimal 8 karakter' })
      .optional(), // Biasanya auto-generated tapi bisa dikirim
    recipient_name: z
      .string()
      .min(1, { message: 'Nama penerima tidak boleh kosong' })
      .max(255, { message: 'Nama penerima maksimal 255 karakter' }),
    occasion: z
      .string()
      .min(1, { message: 'Acara/Acara ucapan tidak boleh kosong' })
      .max(100, { message: 'Nama acara maksimal 100 karakter' }),
    message: z
      .string()
      .min(1, { message: 'Pesan ucapan tidak boleh kosong' }),
    sender_name: z
      .string()
      .min(1, { message: 'Nama pengirim tidak boleh kosong' })
      .max(255, { message: 'Nama pengirim maksimal 255 karakter' }),
    theme_id: z
      .string()
      .min(1, { message: 'Theme ID tidak boleh kosong' })
      .max(50, { message: 'Theme ID maksimal 50 karakter' }),
    music_source: z
      .enum(['library', 'upload'], { message: 'Source musik harus library atau upload' })
      .optional(),
    music_id: z
      .string()
      .uuid({ message: 'Format music_id harus berupa UUID' })
      .optional()
      .nullable(),
    uploaded_music_file_id: z
      .string()
      .uuid({ message: 'Format uploaded_music_file_id harus berupa UUID' })
      .optional()
      .nullable(),
    thumbnail_file_id: z
      .string()
      .uuid({ message: 'Format thumbnail_file_id harus berupa UUID' })
      .optional()
      .nullable(),
    status: z
      .enum(['draft', 'published', 'expired', 'deleted'], { message: 'Status tidak valid' })
      .optional(),
    expires_at: z
      .string()
      .datetime({ message: 'Format expires_at harus berupa datetime string ISO' })
      .optional()
      .nullable(),
  }),
});

export const updateGreetingSchema = greetingIdSchema.merge(
  z.object({
    body: z.object({
      slug: z
        .string()
        .min(1, { message: 'Slug tidak boleh kosong' })
        .max(8, { message: 'Slug maksimal 8 karakter' })
        .optional(),
      recipient_name: z
        .string()
        .min(1, { message: 'Nama penerima tidak boleh kosong' })
        .max(255, { message: 'Nama penerima maksimal 255 karakter' })
        .optional(),
      occasion: z
        .string()
        .min(1, { message: 'Acara/Acara ucapan tidak boleh kosong' })
        .max(100, { message: 'Nama acara maksimal 100 karakter' })
        .optional(),
      message: z
        .string()
        .min(1, { message: 'Pesan ucapan tidak boleh kosong' })
        .optional(),
      sender_name: z
        .string()
        .min(1, { message: 'Nama pengirim tidak boleh kosong' })
        .max(255, { message: 'Nama pengirim maksimal 255 karakter' })
        .optional(),
      theme_id: z
        .string()
        .min(1, { message: 'Theme ID tidak boleh kosong' })
        .max(50, { message: 'Theme ID maksimal 50 karakter' })
        .optional(),
      music_source: z
        .enum(['library', 'upload'], { message: 'Source musik harus library atau upload' })
        .optional(),
      music_id: z
        .string()
        .uuid({ message: 'Format music_id harus berupa UUID' })
        .optional()
        .nullable(),
      uploaded_music_file_id: z
        .string()
        .uuid({ message: 'Format uploaded_music_file_id harus berupa UUID' })
        .optional()
        .nullable(),
      thumbnail_file_id: z
        .string()
        .uuid({ message: 'Format thumbnail_file_id harus berupa UUID' })
        .optional()
        .nullable(),
      status: z
        .enum(['draft', 'published', 'expired', 'deleted'], { message: 'Status tidak valid' })
        .optional(),
      expires_at: z
        .string()
        .datetime({ message: 'Format expires_at harus berupa datetime string ISO' })
        .optional()
        .nullable(),
    }),
  })
);
