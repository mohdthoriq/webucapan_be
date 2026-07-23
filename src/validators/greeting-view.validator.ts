import { z } from 'zod';

export const greetingViewIdSchema = z.object({
  params: z.object({
    id: z.string().uuid({ message: 'Format ID harus berupa UUID' }).openapi({
      description: 'The unique UUID of the greeting view log',
      example: '123e4567-e89b-12d3-a456-426614174000',
    }),
  }),
});

export const greetingViewByGreetingIdSchema = z.object({
  params: z.object({
    greetingId: z.string().uuid({ message: 'Format greetingId harus berupa UUID' }).openapi({
      description: 'The UUID of the greeting card',
      example: '123e4567-e89b-12d3-a456-426614174000',
    }),
  }),
});

export const createGreetingViewSchema = z.object({
  body: z.object({
    greeting_id: z.string().uuid({ message: 'Format greeting_id harus berupa UUID' }).openapi({
      description: 'The UUID of the greeting card',
      example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    ip_address: z
      .string()
      .max(255, { message: 'IP address maksimal 255 karakter' })
      .optional()
      .nullable()
      .openapi({
        description: 'The IP address of the viewer',
        example: '192.168.1.1',
      }),
    user_agent: z
      .string()
      .optional()
      .nullable()
      .openapi({
        description: 'The user agent string of the viewer browser',
        example: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36...',
      }),
    referrer: z
      .string()
      .optional()
      .nullable()
      .openapi({
        description: 'Referrer URL',
        example: 'https://google.com',
      }),
  }),
});

export const updateGreetingViewSchema = greetingViewIdSchema.merge(
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
      ip_address: z
        .string()
        .max(255, { message: 'IP address maksimal 255 karakter' })
        .optional()
        .nullable()
        .openapi({
          description: 'The IP address of the viewer',
          example: '10.0.0.1',
        }),
      user_agent: z
        .string()
        .optional()
        .nullable()
        .openapi({
          description: 'The user agent string of the viewer browser',
          example: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)...',
        }),
      referrer: z
        .string()
        .optional()
        .nullable()
        .openapi({
          description: 'Referrer URL',
          example: 'https://facebook.com',
        }),
    }),
  })
);
