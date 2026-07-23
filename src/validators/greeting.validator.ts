import { z } from 'zod';

export const greetingIdSchema = z.object({
  params: z.object({
    id: z.string().uuid({ message: 'Format ID harus berupa UUID' }).openapi({
      description: 'The unique UUID of the greeting card',
      example: '123e4567-e89b-12d3-a456-426614174000',
    }),
  }),
});

export const greetingSlugSchema = z.object({
  params: z.object({
    slug: z
      .string()
      .min(1, { message: 'Slug tidak boleh kosong' })
      .max(8, { message: 'Slug maksimal 8 karakter' })
      .openapi({
        description: 'The short code slug of the greeting card',
        example: 'abcd1234',
      }),
  }),
});

export const createGreetingSchema = z.object({
  body: z.object({
    slug: z
      .string()
      .min(1, { message: 'Slug tidak boleh kosong' })
      .max(8, { message: 'Slug maksimal 8 karakter' })
      .optional()
      .openapi({
        description: 'Custom slug (if not provided, one is generated)',
        example: 'mycard12',
      }),
    recipient_name: z
      .string()
      .min(1, { message: 'Nama penerima tidak boleh kosong' })
      .max(255, { message: 'Nama penerima maksimal 255 karakter' })
      .openapi({
        description: 'Recipient display name',
        example: 'John Doe',
      }),
    occasion: z
      .string()
      .min(1, { message: 'Acara/Acara ucapan tidak boleh kosong' })
      .max(100, { message: 'Nama acara maksimal 100 karakter' })
      .openapi({
        description: 'Event or occasion name',
        example: 'Birthday',
      }),
    message: z
      .string()
      .min(1, { message: 'Pesan ucapan tidak boleh kosong' })
      .openapi({
        description: 'Personalized greeting text message',
        example: 'Wish you all the best on your special day!',
      }),
    sender_name: z
      .string()
      .min(1, { message: 'Nama pengirim tidak boleh kosong' })
      .max(255, { message: 'Nama pengirim maksimal 255 karakter' })
      .openapi({
        description: 'Sender display name',
        example: 'Jane Doe',
      }),
    theme_id: z
      .string()
      .min(1, { message: 'Theme ID tidak boleh kosong' })
      .max(50, { message: 'Theme ID maksimal 50 karakter' })
      .openapi({
        description: 'Reference to Theme ID',
        example: 'birthday-gold',
      }),
    music_source: z
      .enum(['library', 'upload'], { message: 'Source musik harus library atau upload' })
      .optional()
      .openapi({
        description: 'Origin of music track',
        example: 'library',
      }),
    music_id: z
      .string()
      .uuid({ message: 'Format music_id harus berupa UUID' })
      .optional()
      .nullable()
      .openapi({
        description: 'Reference to library music UUID',
        example: '123e4567-e89b-12d3-a456-426614174000',
      }),
    uploaded_music_file_id: z
      .string()
      .uuid({ message: 'Format uploaded_music_file_id harus berupa UUID' })
      .optional()
      .nullable()
      .openapi({
        description: 'Reference to uploaded audio file UUID',
        example: '123e4567-e89b-12d3-a456-426614174000',
      }),
    thumbnail_file_id: z
      .string()
      .uuid({ message: 'Format thumbnail_file_id harus berupa UUID' })
      .optional()
      .nullable()
      .openapi({
        description: 'Reference to uploaded image file UUID used as thumbnail',
        example: '123e4567-e89b-12d3-a456-426614174000',
      }),
    status: z
      .enum(['draft', 'published', 'expired', 'deleted'], { message: 'Status tidak valid' })
      .optional()
      .openapi({
        description: 'Publish status of card',
        example: 'published',
      }),
    expires_at: z
      .string()
      .datetime({ message: 'Format expires_at harus berupa datetime string ISO' })
      .optional()
      .nullable()
      .openapi({
        description: 'Datetime when card expires',
        example: '2026-12-31T23:59:59.000Z',
      }),
  }),
});

export const updateGreetingSchema = greetingIdSchema.merge(
  z.object({
    body: z.object({
      slug: z
        .string()
        .min(1, { message: 'Slug tidak boleh kosong' })
        .max(8, { message: 'Slug maksimal 8 karakter' })
        .optional()
        .openapi({
          description: 'Short code slug of greeting card',
          example: 'newslug1',
        }),
      recipient_name: z
        .string()
        .min(1, { message: 'Nama penerima tidak boleh kosong' })
        .max(255, { message: 'Nama penerima maksimal 255 karakter' })
        .optional()
        .openapi({
          description: 'Recipient display name',
          example: 'Johnny Doe',
        }),
      occasion: z
        .string()
        .min(1, { message: 'Acara/Acara ucapan tidak boleh kosong' })
        .max(100, { message: 'Nama acara maksimal 100 karakter' })
        .optional()
        .openapi({
          description: 'Event or occasion name',
          example: 'Graduation',
        }),
      message: z
        .string()
        .min(1, { message: 'Pesan ucapan tidak boleh kosong' })
        .optional()
        .openapi({
          description: 'Personalized greeting text message',
          example: 'Congrats on your graduation!',
        }),
      sender_name: z
        .string()
        .min(1, { message: 'Nama pengirim tidak boleh kosong' })
        .max(255, { message: 'Nama pengirim maksimal 255 karakter' })
        .optional()
        .openapi({
          description: 'Sender display name',
          example: 'Jane Doe',
        }),
      theme_id: z
        .string()
        .min(1, { message: 'Theme ID tidak boleh kosong' })
        .max(50, { message: 'Theme ID maksimal 50 karakter' })
        .optional()
        .openapi({
          description: 'Reference to Theme ID',
          example: 'birthday-gold',
        }),
      music_source: z
        .enum(['library', 'upload'], { message: 'Source musik harus library atau upload' })
        .optional()
        .openapi({
          description: 'Origin of music track',
          example: 'upload',
        }),
      music_id: z
        .string()
        .uuid({ message: 'Format music_id harus berupa UUID' })
        .optional()
        .nullable()
        .openapi({
          description: 'Reference to library music UUID',
          example: '123e4567-e89b-12d3-a456-426614174000',
        }),
      uploaded_music_file_id: z
        .string()
        .uuid({ message: 'Format uploaded_music_file_id harus berupa UUID' })
        .optional()
        .nullable()
        .openapi({
          description: 'Reference to uploaded audio file UUID',
          example: '123e4567-e89b-12d3-a456-426614174000',
        }),
      thumbnail_file_id: z
        .string()
        .uuid({ message: 'Format thumbnail_file_id harus berupa UUID' })
        .optional()
        .nullable()
        .openapi({
          description: 'Reference to uploaded image file UUID used as thumbnail',
          example: '123e4567-e89b-12d3-a456-426614174000',
        }),
      status: z
        .enum(['draft', 'published', 'expired', 'deleted'], { message: 'Status tidak valid' })
        .optional()
        .openapi({
          description: 'Publish status of card',
          example: 'draft',
        }),
      expires_at: z
        .string()
        .datetime({ message: 'Format expires_at harus berupa datetime string ISO' })
        .optional()
        .nullable()
        .openapi({
          description: 'Datetime when card expires',
          example: '2027-01-01T00:00:00.000Z',
        }),
    }),
  })
);
