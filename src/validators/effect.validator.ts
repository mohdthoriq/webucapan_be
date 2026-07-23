import { z } from 'zod';

// Skema untuk mengecek apakah ID di URL benar-benar UUID
export const effectIdSchema = z.object({
  params: z.object({
    id: z.string().uuid({ message: 'Format ID harus berupa UUID' }).openapi({
      description: 'The unique UUID of the effect',
      example: '123e4567-e89b-12d3-a456-426614174000',
    }),
  }),
});

// Skema untuk POST /api/effects
export const createEffectSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, { message: 'Name tidak boleh kosong' })
      .max(100, { message: 'Name maksimal 100 karakter' })
      .openapi({
        description: 'The display name of the effect',
        example: 'Confetti Rain',
      }),
    code: z
      .string()
      .min(1, { message: 'Code tidak boleh kosong' })
      .max(100, { message: 'Code maksimal 100 karakter' })
      .openapi({
        description: 'Unique system code for the effect',
        example: 'confetti_rain',
      }),
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
        .optional()
        .openapi({
          description: 'The display name of the effect',
          example: 'Sparkling Stars',
        }),
      code: z
        .string()
        .min(1, { message: 'Code tidak boleh kosong' })
        .max(100, { message: 'Code maksimal 100 karakter' })
        .optional()
        .openapi({
          description: 'Unique system code for the effect',
          example: 'star_sparkle',
        }),
    }),
  })
);
