import { z } from 'zod';

export const musicIdSchema = z.object({
  params: z.object({
    id: z.string().uuid({ message: 'Format ID harus berupa UUID' }).openapi({
      description: 'The unique UUID of the music track',
      example: '123e4567-e89b-12d3-a456-426614174000',
    }),
  }),
});

export const queryMusicSchema = z.object({
  query: z.object({
    activeOnly: z
      .string()
      .refine(val => val === 'true' || val === 'false', {
        message: 'activeOnly harus bernilai true atau false',
      })
      .optional()
      .openapi({
        description: 'Filter active music tracks only',
        example: 'true',
      }),
    category: z.string().optional().openapi({
      description: 'Filter music by category name',
      example: 'Romance',
    }),
  }),
});

export const createMusicSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(1, { message: 'Title tidak boleh kosong' })
      .max(255, { message: 'Title maksimal 255 karakter' })
      .openapi({
        description: 'The title of the music track',
        example: 'Happy Birthday to You',
      }),
    file_url: z
      .string()
      .min(1, { message: 'URL file tidak boleh kosong' })
      .openapi({
        description: 'URL of the hosted music audio file',
        example: '/uploads/music/birthday.mp3',
      }),
    duration_seconds: z
      .number()
      .int()
      .positive({ message: 'Durasi harus berupa angka positif' })
      .optional()
      .nullable()
      .openapi({
        description: 'Length of the track in seconds',
        example: 180,
      }),
    category: z
      .string()
      .max(100, { message: 'Kategori maksimal 100 karakter' })
      .optional()
      .nullable()
      .openapi({
        description: 'Genre/category of the track',
        example: 'Birthday',
      }),
    is_active: z.boolean().optional().openapi({
      description: 'Active status of the music track',
      example: true,
    }),
  }),
});

export const updateMusicSchema = musicIdSchema.merge(
  z.object({
    body: z.object({
      title: z
        .string()
        .min(3, { message: 'Title minimal 3 karakter' })
        .max(255, { message: 'Title maksimal 255 karakter' })
        .optional()
        .openapi({
          description: 'The title of the music track',
          example: 'Happy Birthday Remix',
        }),
      file_url: z
        .string()
        .min(1, { message: 'URL file tidak boleh kosong' })
        .optional()
        .openapi({
          description: 'URL of the hosted music audio file',
          example: '/uploads/music/birthday_remix.mp3',
        }),
      duration_seconds: z
        .number()
        .int()
        .positive({ message: 'Durasi harus berupa angka positif' })
        .optional()
        .nullable()
        .openapi({
          description: 'Length of the track in seconds',
          example: 195,
        }),
      category: z
        .string()
        .max(100, { message: 'Kategori maksimal 100 karakter' })
        .optional()
        .nullable()
        .openapi({
          description: 'Genre/category of the track',
          example: 'Birthday Pop',
        }),
      is_active: z.boolean().optional().openapi({
        description: 'Active status of the music track',
        example: true,
      }),
    }),
  })
);
