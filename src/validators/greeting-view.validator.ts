import { z } from 'zod';

export const greetingViewIdSchema = z.object({
  params: z.object({
    id: z.string().uuid({ message: 'Format ID harus berupa UUID' }),
  }),
});

export const greetingViewByGreetingIdSchema = z.object({
  params: z.object({
    greetingId: z.string().uuid({ message: 'Format greetingId harus berupa UUID' }),
  }),
});

export const createGreetingViewSchema = z.object({
  body: z.object({
    greeting_id: z.string().uuid({ message: 'Format greeting_id harus berupa UUID' }),
    ip_address: z
      .string()
      .max(255, { message: 'IP address maksimal 255 karakter' })
      .optional()
      .nullable(),
    user_agent: z
      .string()
      .optional()
      .nullable(),
    referrer: z
      .string()
      .optional()
      .nullable(),
  }),
});

export const updateGreetingViewSchema = greetingViewIdSchema.merge(
  z.object({
    body: z.object({
      greeting_id: z
        .string()
        .uuid({ message: 'Format greeting_id harus berupa UUID' })
        .optional(),
      ip_address: z
        .string()
        .max(255, { message: 'IP address maksimal 255 karakter' })
        .optional()
        .nullable(),
      user_agent: z
        .string()
        .optional()
        .nullable(),
      referrer: z
        .string()
        .optional()
        .nullable(),
    }),
  })
);
