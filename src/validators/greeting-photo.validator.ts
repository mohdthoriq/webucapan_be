import { z } from 'zod';

export const greetingPhotoIdSchema = z.object({
  params: z.object({
    id: z.string().uuid({ message: 'Format ID harus berupa UUID' }),
  }),
});

export const greetingPhotoByGreetingIdSchema = z.object({
  params: z.object({
    greetingId: z.string().uuid({ message: 'Format greetingId harus berupa UUID' }),
  }),
});

export const createGreetingPhotoSchema = z.object({
  body: z.object({
    greeting_id: z.string().uuid({ message: 'Format greeting_id harus berupa UUID' }),
    file_id: z.string().uuid({ message: 'Format file_id harus berupa UUID' }),
    display_order: z
      .number()
      .int({ message: 'Display order harus berupa bilangan bulat' })
      .optional(),
    caption: z
      .string()
      .max(255, { message: 'Caption maksimal 255 karakter' })
      .optional()
      .nullable(),
  }),
});

export const updateGreetingPhotoSchema = greetingPhotoIdSchema.merge(
  z.object({
    body: z.object({
      display_order: z
        .number()
        .int({ message: 'Display order harus berupa bilangan bulat' })
        .optional(),
      caption: z
        .string()
        .max(255, { message: 'Caption maksimal 255 karakter' })
        .optional()
        .nullable(),
    }),
  })
);

export const reorderGreetingPhotoSchema = z.object({
  body: z.object({
    photos: z.array(
      z.object({
        id: z.string().uuid({ message: 'Format id harus berupa UUID' }),
        display_order: z.number().int({ message: 'Display order harus berupa bilangan bulat' }),
      })
    ).min(1, { message: 'Daftar foto minimal berisi 1 item' }),
  }),
});
