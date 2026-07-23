import { z } from 'zod';

export const fileIdSchema = z.object({
  params: z.object({
    id: z.string().uuid({ message: 'Format ID harus berupa UUID' }).openapi({
      description: 'The unique UUID of the file record',
      example: '123e4567-e89b-12d3-a456-426614174000',
    }),
  }),
});

export const createFileSchema = z.object({
  body: z.object({
    file_name: z
      .string()
      .max(255, { message: 'Nama file maksimal 255 karakter' })
      .optional()
      .nullable()
      .openapi({
        description: 'Original name of the uploaded file',
        example: 'photo.jpg',
      }),
    file_url: z
      .string()
      .min(1, { message: 'URL file tidak boleh kosong' })
      .openapi({
        description: 'Public URL of the file resource',
        example: 'https://res.cloudinary.com/.../photo.jpg',
      }),
    file_type: z
      .string()
      .max(50, { message: 'Tipe file maksimal 50 karakter' })
      .optional()
      .nullable()
      .openapi({
        description: 'Broad classification of the file (e.g. image, music)',
        example: 'image',
      }),
    mime_type: z
      .string()
      .max(100, { message: 'MIME type maksimal 100 karakter' })
      .optional()
      .nullable()
      .openapi({
        description: 'MIME media type',
        example: 'image/jpeg',
      }),
    file_size: z
      .union([z.number(), z.string(), z.bigint()])
      .optional()
      .nullable()
      .openapi({
        type: 'integer',
        description: 'File size in bytes',
        example: 1048576,
      }),
    storage_path: z
      .string()
      .optional()
      .nullable()
      .openapi({
        description: 'Internal storage path or public ID',
        example: 'folder/photo_uuid',
      }),
  }),
});

export const updateFileSchema = fileIdSchema.merge(
  z.object({
    body: z.object({
      file_name: z
        .string()
        .max(255, { message: 'Nama file maksimal 255 karakter' })
        .optional()
        .nullable()
        .openapi({
          description: 'Original name of the uploaded file',
          example: 'new_photo.jpg',
        }),
      file_url: z
        .string()
        .min(1, { message: 'URL file tidak boleh kosong' })
        .optional()
        .openapi({
          description: 'Public URL of the file resource',
          example: 'https://res.cloudinary.com/.../new_photo.jpg',
        }),
      file_type: z
        .string()
        .max(50, { message: 'Tipe file maksimal 50 karakter' })
        .optional()
        .nullable()
        .openapi({
          description: 'Broad classification of the file',
          example: 'image',
        }),
      mime_type: z
        .string()
        .max(100, { message: 'MIME type maksimal 100 karakter' })
        .optional()
        .nullable()
        .openapi({
          description: 'MIME media type',
          example: 'image/jpeg',
        }),
      file_size: z
        .union([z.number(), z.string(), z.bigint()])
        .optional()
        .nullable()
        .openapi({
          type: 'integer',
          description: 'File size in bytes',
          example: 2048576,
        }),
      storage_path: z
        .string()
        .optional()
        .nullable()
        .openapi({
          description: 'Internal storage path or public ID',
          example: 'folder/new_photo_uuid',
        }),
    }),
  })
);
