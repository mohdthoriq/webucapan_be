import { z } from 'zod';
import { registry } from '../registry.js';

export const paginationSchema = registry.register(
  'Pagination',
  z.object({
    page: z.number().openapi({ example: 1 }),
    limit: z.number().openapi({ example: 10 }),
    totalItems: z.number().openapi({ example: 100 }),
    totalPages: z.number().openapi({ example: 10 }),
  })
);

export const createPaginationResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T, name: string) => {
  return registry.register(
    name,
    z.object({
      success: z.boolean().openapi({ example: true }),
      message: z.string().openapi({ example: 'Fetch list successful' }),
      data: z.array(dataSchema),
      pagination: paginationSchema,
    })
  );
};
