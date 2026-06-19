import { z } from 'zod';

export const themeEffectParamsSchema = z.object({
  params: z.object({
    themeId: z
      .string()
      .min(1, { message: 'ID tema tidak boleh kosong' })
      .max(50, { message: 'ID tema maksimal 50 karakter' }),
    effectId: z.string().uuid({ message: 'Format effectId harus berupa UUID' }),
  }),
});

export const themeIdParamSchema = z.object({
  params: z.object({
    themeId: z
      .string()
      .min(1, { message: 'ID tema tidak boleh kosong' })
      .max(50, { message: 'ID tema maksimal 50 karakter' }),
  }),
});

export const effectIdParamSchema = z.object({
  params: z.object({
    effectId: z.string().uuid({ message: 'Format effectId harus berupa UUID' }),
  }),
});

export const assignThemeEffectSchema = z.object({
  body: z.object({
    theme_id: z
      .string()
      .min(1, { message: 'theme_id tidak boleh kosong' })
      .max(50, { message: 'theme_id maksimal 50 karakter' }),
    effect_id: z.string().uuid({ message: 'Format effect_id harus berupa UUID' }),
  }),
});
