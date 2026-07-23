import { z } from 'zod';

export const greetingSettingIdSchema = z.object({
  params: z.object({
    greetingId: z.string().uuid({ message: 'Format greetingId harus berupa UUID' }).openapi({
      description: 'The UUID of the greeting card',
      example: '123e4567-e89b-12d3-a456-426614174000',
    }),
  }),
});

export const upsertGreetingSettingSchema = z.object({
  params: z.object({
    greetingId: z.string().uuid({ message: 'Format greetingId harus berupa UUID' }).openapi({
      description: 'The UUID of the greeting card',
      example: '123e4567-e89b-12d3-a456-426614174000',
    }),
  }),
  body: z.object({
    autoplay_music: z.boolean().optional().openapi({
      description: 'Whether to automatically play background music',
      example: true,
    }),
    show_confetti: z.boolean().optional().openapi({
      description: 'Whether to display falling confetti effect',
      example: true,
    }),
    show_slideshow: z.boolean().optional().openapi({
      description: 'Whether to show photo slideshow',
      example: false,
    }),
    allow_download_photo: z.boolean().optional().openapi({
      description: 'Whether users can download photos from the card',
      example: true,
    }),
  }),
});
