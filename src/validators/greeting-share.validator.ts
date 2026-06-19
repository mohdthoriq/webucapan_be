import { z } from 'zod';

export const greetingShareIdSchema = z.object({
  params: z.object({
    id: z.string().uuid({ message: 'Format ID harus berupa UUID' }),
  }),
});

export const greetingShareByGreetingIdSchema = z.object({
  params: z.object({
    greetingId: z.string().uuid({ message: 'Format greetingId harus berupa UUID' }),
  }),
});

export const createGreetingShareSchema = z.object({
  body: z.object({
    greeting_id: z.string().uuid({ message: 'Format greeting_id harus berupa UUID' }),
    platform: z
      .string()
      .min(1, { message: 'Platform tidak boleh kosong' })
      .max(50, { message: 'Nama platform maksimal 50 karakter' }),
  }),
});

export const updateGreetingShareSchema = greetingShareIdSchema.merge(
  z.object({
    body: z.object({
      greeting_id: z
        .string()
        .uuid({ message: 'Format greeting_id harus berupa UUID' })
        .optional(),
      platform: z
        .string()
        .min(1, { message: 'Platform tidak boleh kosong' })
        .max(50, { message: 'Nama platform maksimal 50 karakter' })
        .optional(),
    }),
  })
);
