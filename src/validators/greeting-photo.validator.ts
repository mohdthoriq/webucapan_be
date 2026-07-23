import { z } from 'zod';

export const greetingPhotoIdSchema = z.object({
  params: z.object({
    id: z.string().uuid({ message: 'Format ID harus berupa UUID' }).openapi({
      description: 'The unique UUID of the greeting photo',
      example: '123e4567-e89b-12d3-a456-426614174000',
    }),
  }),
});

export const greetingPhotoByGreetingIdSchema = z.object({
  params: z.object({
    greetingId: z.string().uuid({ message: 'Format greetingId harus berupa UUID' }).openapi({
      description: 'The UUID of the greeting card',
      example: '123e4567-e89b-12d3-a456-426614174000',
    }),
  }),
});

export const createGreetingPhotoSchema = z.object({
  body: z.object({
    greeting_id: z.string().uuid({ message: 'Format greeting_id harus berupa UUID' }).openapi({
      description: 'The UUID of the greeting card',
      example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    file_id: z.string().uuid({ message: 'Format file_id harus berupa UUID' }).openapi({
      description: 'The UUID of the uploaded file/image',
      example: '123e4567-e89b-12d3-a456-426614174000',
    }),
    display_order: z
      .number()
      .int({ message: 'Display order harus berupa bilangan bulat' })
      .optional()
      .openapi({
        description: 'Order of display in slideshow/gallery',
        example: 1,
      }),
    caption: z
      .string()
      .max(255, { message: 'Caption maksimal 255 karakter' })
      .optional()
      .nullable()
      .openapi({
        description: 'Optional photo caption text',
        example: 'Our beautiful moments together',
      }),
  }),
});

export const updateGreetingPhotoSchema = greetingPhotoIdSchema.merge(
  z.object({
    body: z.object({
      display_order: z
        .number()
        .int({ message: 'Display order harus berupa bilangan bulat' })
        .optional()
        .openapi({
          description: 'Order of display in slideshow/gallery',
          example: 2,
        }),
      caption: z
        .string()
        .max(255, { message: 'Caption maksimal 255 karakter' })
        .optional()
        .nullable()
        .openapi({
          description: 'Optional photo caption text',
          example: 'Updated photo caption',
        }),
    }),
  })
);

export const reorderGreetingPhotoSchema = z.object({
  body: z.object({
    photos: z.array(
      z.object({
        id: z.string().uuid({ message: 'Format id harus berupa UUID' }).openapi({
          description: 'The greeting photo UUID',
          example: '123e4567-e89b-12d3-a456-426614174000',
        }),
        display_order: z.number().int({ message: 'Display order harus berupa bilangan bulat' }).openapi({
          description: 'New display order',
          example: 1,
        }),
      })
    ).min(1, { message: 'Daftar foto minimal berisi 1 item' }),
  }),
});
