import { z } from 'zod';

// Skema untuk mengecek apakah ID di URL benar-benar UUID
export const effectIdSchema = z.object({
  params: z.object({
    id: z.string().uuid({ message: 'Format ID harus berupa UUID' }),
  }),
});

// Skema untuk POST /api/effects
export const createEffectSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, { message: 'Name tidak boleh kosong' })
      .max(100, { message: 'Name maksimal 100 karakter' }),
    code: z
      .string()
      .min(1, { message: 'Code tidak boleh kosong' })
      .max(100, { message: 'Code maksimal 100 karakter' }),
  }),
});

// Skema untuk PUT /api/effects/:id (Gabungan cek ID dan Body)
export const updateEffectSchema = effectIdSchema.merge(
  z.object({
    body: z.object({
      name: z
        .string()
        .min(1, { message: 'Name tidak boleh kosong' })
        .max(100, { message: 'Name maksimal 100 karakter' })
        .optional(),
      code: z
        .string()
        .min(1, { message: 'Code tidak boleh kosong' })
        .max(100, { message: 'Code maksimal 100 karakter' })
        .optional(),
    }),
  })
);
