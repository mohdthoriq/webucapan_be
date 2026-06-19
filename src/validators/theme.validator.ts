import { z } from 'zod';

export const themeIdSchema = z.object({
  params: z.object({
    id: z
      .string()
      .min(1, { message: 'ID tema tidak boleh kosong' })
      .max(50, { message: 'ID tema maksimal 50 karakter' }),
  }),
});

export const queryThemeSchema = z.object({
  query: z.object({
    activeOnly: z
      .string()
      .refine(val => val === 'true' || val === 'false', {
        message: 'activeOnly harus bernilai true atau false',
      })
      .optional(),
  }),
});

export const createThemeSchema = z.object({
  body: z.object({
    id: z
      .string()
      .min(1, { message: 'ID tema tidak boleh kosong' })
      .max(50, { message: 'ID tema maksimal 50 karakter' })
      .optional(),
    name: z
      .string()
      .min(1, { message: 'Nama tema tidak boleh kosong' })
      .max(100, { message: 'Nama tema maksimal 100 karakter' }),
    emoji: z
      .string()
      .max(10, { message: 'Emoji maksimal 10 karakter' })
      .optional()
      .nullable(),
    background_gradient: z
      .string()
      .min(1, { message: 'Background gradient tidak boleh kosong' }),
    confetti_colors: z
      .array(z.string())
      .optional()
      .nullable(),
    is_active: z.boolean().optional(),
  }),
});

export const updateThemeSchema = themeIdSchema.merge(
  z.object({
    body: z.object({
      name: z
        .string()
        .min(1, { message: 'Nama tema tidak boleh kosong' })
        .max(100, { message: 'Nama tema maksimal 100 karakter' })
        .optional(),
      emoji: z
        .string()
        .max(10, { message: 'Emoji maksimal 10 karakter' })
        .optional()
        .nullable(),
      background_gradient: z
        .string()
        .min(1, { message: 'Background gradient tidak boleh kosong' })
        .optional(),
      confetti_colors: z
        .array(z.string())
        .optional()
        .nullable(),
      is_active: z.boolean().optional(),
    }),
  })
);
