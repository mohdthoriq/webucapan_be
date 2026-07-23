import { z } from 'zod';

export const greetingShareIdSchema = z.object({
  params: z.object({
    id: z.string().uuid({ message: 'Format ID harus berupa UUID' }).openapi({
      description: 'The unique UUID of the greeting share log',
      example: '123e4567-e89b-12d3-a456-426614174000',
    }),
  }),
});

export const greetingShareByGreetingIdSchema = z.object({
  params: z.object({
    greetingId: z.string().uuid({ message: 'Format greetingId harus berupa UUID' }).openapi({
      description: 'The UUID of the greeting card',
      example: '123e4567-e89b-12d3-a456-426614174000',
    }),
  }),
});

export const createGreetingShareSchema = z.object({
  body: z.object({
    greeting_id: z.string().uuid({ message: 'Format greeting_id harus berupa UUID' }).openapi({
      description: 'The UUID of the greeting card',
      example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    platform: z
      .string()
      .min(1, { message: 'Platform tidak boleh kosong' })
      .max(50, { message: 'Nama platform maksimal 50 karakter' })
      .openapi({
        description: 'The platform name where the greeting card is shared (e.g. WhatsApp, Facebook)',
        example: 'WhatsApp',
      }),
  }),
});

export const updateGreetingShareSchema = greetingShareIdSchema.merge(
  z.object({
    body: z.object({
      greeting_id: z
        .string()
        .uuid({ message: 'Format greeting_id harus berupa UUID' })
        .optional()
        .openapi({
          description: 'The UUID of the greeting card',
          example: '123e4567-e89b-12d3-a456-426614174000',
        }),
      platform: z
        .string()
        .min(1, { message: 'Platform tidak boleh kosong' })
        .max(50, { message: 'Nama platform maksimal 50 karakter' })
        .optional()
        .openapi({
          description: 'The platform name where the greeting card is shared',
          example: 'Telegram',
        }),
    }),
  })
);
