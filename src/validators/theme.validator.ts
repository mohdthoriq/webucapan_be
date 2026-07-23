import { z } from 'zod';

export const themeIdSchema = z.object({
  params: z.object({
    id: z
      .string()
      .min(1, { message: 'ID tema tidak boleh kosong' })
      .max(50, { message: 'ID tema maksimal 50 karakter' })
      .openapi({
        description: 'The slug or ID identifier of the theme',
        example: 'birthday-gold',
      }),
  }),
});

export const queryThemeSchema = z.object({
  query: z.object({
    activeOnly: z
      .string()
      .refine(val => val === 'true' || val === 'false', {
        message: 'activeOnly harus bernilai true atau false',
      })
      .optional()
      .openapi({
        description: 'Filter themes that are active only',
        example: 'true',
      }),
  }),
});

export const createThemeSchema = z.object({
  body: z.object({
    id: z
      .string()
      .min(1, { message: 'ID tema tidak boleh kosong' })
      .max(50, { message: 'ID tema maksimal 50 karakter' })
      .optional()
      .openapi({
        description: 'Optional custom ID/slug for the theme',
        example: 'birthday-gold',
      }),
    name: z
      .string()
      .min(1, { message: 'Nama tema tidak boleh kosong' })
      .max(100, { message: 'Nama tema maksimal 100 karakter' })
      .openapi({
        description: 'Display name of the theme',
        example: 'Golden Birthday',
      }),
    emoji: z
      .string()
      .max(10, { message: 'Emoji maksimal 10 karakter' })
      .optional()
      .nullable()
      .openapi({
        description: 'Emoji icon for the theme',
        example: '🎉',
      }),
    background_gradient: z
      .string()
      .min(1, { message: 'Background gradient tidak boleh kosong' })
      .openapi({
        description: 'CSS background gradient style',
        example: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
      }),
    confetti_colors: z
      .array(z.string())
      .optional()
      .nullable()
      .openapi({
        description: 'Array of hex/color codes for confetti effect',
        example: ['#FFD700', '#FFA500'],
      }),
    is_active: z.boolean().optional().openapi({
      description: 'Active status of the theme',
      example: true,
    }),
  }),
});

export const updateThemeSchema = themeIdSchema.merge(
  z.object({
    body: z.object({
      name: z
        .string()
        .min(1, { message: 'Nama tema tidak boleh kosong' })
        .max(100, { message: 'Nama tema maksimal 100 karakter' })
        .optional()
        .openapi({
          description: 'Display name of the theme',
          example: 'Golden Birthday v2',
        }),
      emoji: z
        .string()
        .max(10, { message: 'Emoji maksimal 10 karakter' })
        .optional()
        .nullable()
        .openapi({
          description: 'Emoji icon for the theme',
          example: '🎂',
        }),
      background_gradient: z
        .string()
        .min(1, { message: 'Background gradient tidak boleh kosong' })
        .optional()
        .openapi({
          description: 'CSS background gradient style',
          example: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        }),
      confetti_colors: z
        .array(z.string())
        .optional()
        .nullable()
        .openapi({
          description: 'Array of hex/color codes for confetti effect',
          example: ['#FFFFFF', '#C0C0C0'],
        }),
      is_active: z.boolean().optional().openapi({
        description: 'Active status of the theme',
        example: true,
      }),
    }),
  })
);
