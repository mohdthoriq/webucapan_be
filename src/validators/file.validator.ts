import { z } from 'zod';

export const fileIdSchema = z.object({
  params: z.object({
    id: z.string().uuid({ message: 'Format ID harus berupa UUID' }),
  }),
});

export const createFileSchema = z.object({
  body: z.object({
    file_name: z
      .string()
      .max(255, { message: 'Nama file maksimal 255 karakter' })
      .optional()
      .nullable(),
    file_url: z
      .string()
      .min(1, { message: 'URL file tidak boleh kosong' }),
    file_type: z
      .string()
      .max(50, { message: 'Tipe file maksimal 50 karakter' })
      .optional()
      .nullable(),
    mime_type: z
      .string()
      .max(100, { message: 'MIME type maksimal 100 karakter' })
      .optional()
      .nullable(),
    file_size: z
      .union([z.number(), z.string(), z.bigint()])
      .optional()
      .nullable(),
    storage_path: z
      .string()
      .optional()
      .nullable(),
  }),
});

export const updateFileSchema = fileIdSchema.merge(
  z.object({
    body: z.object({
      file_name: z
        .string()
        .max(255, { message: 'Nama file maksimal 255 karakter' })
        .optional()
        .nullable(),
      file_url: z
        .string()
        .min(1, { message: 'URL file tidak boleh kosong' })
        .optional(),
      file_type: z
        .string()
        .max(50, { message: 'Tipe file maksimal 50 karakter' })
        .optional()
        .nullable(),
      mime_type: z
        .string()
        .max(100, { message: 'MIME type maksimal 100 karakter' })
        .optional()
        .nullable(),
      file_size: z
        .union([z.number(), z.string(), z.bigint()])
        .optional()
        .nullable(),
      storage_path: z
        .string()
        .optional()
        .nullable(),
    }),
  })
);
