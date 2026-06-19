import { z } from 'zod';

export const musicIdSchema = z.object({
  params: z.object({
    id: z.string().uuid({ message: 'Format ID harus berupa UUID' }),
  }),
});

export const queryMusicSchema = z.object({
  query: z.object({
    activeOnly: z
      .string()
      .refine(val => val === 'true' || val === 'false', {
        message: 'activeOnly harus bernilai true atau false',
      })
      .optional(),
    category: z.string().optional(),
  }),
});

export const createMusicSchema = z.object({
  body: z.object({
    title: z
      .string()
      .min(3, { message: 'Title minimal 3 karakter' })
      .max(255, { message: 'Title maksimal 255 karakter' }),
    file_url: z
      .string()
      .min(1, { message: 'URL file tidak boleh kosong' }),
    duration_seconds: z
      .number()
      .int()
      .positive({ message: 'Durasi harus berupa angka positif' })
      .optional()
      .nullable(),
    category: z
      .string()
      .max(100, { message: 'Kategori maksimal 100 karakter' })
      .optional()
      .nullable(),
    is_active: z.boolean().optional(),
  }),
});

export const updateMusicSchema = musicIdSchema.merge(
  z.object({
    body: z.object({
      title: z
        .string()
        .min(3, { message: 'Title minimal 3 karakter' })
        .max(255, { message: 'Title maksimal 255 karakter' })
        .optional(),
      file_url: z
        .string()
        .min(1, { message: 'URL file tidak boleh kosong' })
        .optional(),
      duration_seconds: z
        .number()
        .int()
        .positive({ message: 'Durasi harus berupa angka positif' })
        .optional()
        .nullable(),
      category: z
        .string()
        .max(100, { message: 'Kategori maksimal 100 karakter' })
        .optional()
        .nullable(),
      is_active: z.boolean().optional(),
    }),
  })
);
