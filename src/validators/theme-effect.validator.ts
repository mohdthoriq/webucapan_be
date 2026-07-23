import { z } from 'zod';

export const themeEffectParamsSchema = z.object({
  params: z.object({
    themeId: z
      .string()
      .min(1, { message: 'ID tema tidak boleh kosong' })
      .max(50, { message: 'ID tema maksimal 50 karakter' })
      .openapi({
        description: 'The theme ID (slug)',
        example: 'birthday-gold',
      }),
    effectId: z.string().uuid({ message: 'Format effectId harus berupa UUID' }).openapi({
      description: 'The effect UUID',
      example: '123e4567-e89b-12d3-a456-426614174000',
    }),
  }),
});

export const themeIdParamSchema = z.object({
  params: z.object({
    themeId: z
      .string()
      .min(1, { message: 'ID tema tidak boleh kosong' })
      .max(50, { message: 'ID tema maksimal 50 karakter' })
      .openapi({
        description: 'The theme ID (slug)',
        example: 'birthday-gold',
      }),
  }),
});

export const effectIdParamSchema = z.object({
  params: z.object({
    effectId: z.string().uuid({ message: 'Format effectId harus berupa UUID' }).openapi({
      description: 'The effect UUID',
      example: '123e4567-e89b-12d3-a456-426614174000',
    }),
  }),
});

export const assignThemeEffectSchema = z.object({
  body: z.object({
    theme_id: z
      .string()
      .min(1, { message: 'theme_id tidak boleh kosong' })
      .max(50, { message: 'theme_id maksimal 50 karakter' })
      .openapi({
        description: 'The theme ID (slug) to link',
        example: 'birthday-gold',
      }),
    effect_id: z.string().uuid({ message: 'Format effect_id harus berupa UUID' }).openapi({
      description: 'The effect UUID to link',
      example: '123e4567-e89b-12d3-a456-426614174000',
    }),
  }),
});
