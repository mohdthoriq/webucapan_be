import { z } from 'zod';

export const greetingSettingIdSchema = z.object({
  params: z.object({
    greetingId: z.string().uuid({ message: 'Format greetingId harus berupa UUID' }),
  }),
});

export const upsertGreetingSettingSchema = z.object({
  params: z.object({
    greetingId: z.string().uuid({ message: 'Format greetingId harus berupa UUID' }),
  }),
  body: z.object({
    autoplay_music: z.boolean().optional(),
    show_confetti: z.boolean().optional(),
    show_slideshow: z.boolean().optional(),
    allow_download_photo: z.boolean().optional(),
  }),
});
