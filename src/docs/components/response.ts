import { z } from 'zod';
import { registry } from '../registry.js';

export const createSuccessResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T, name: string) => {
  return registry.register(
    name,
    z.object({
      success: z.boolean().openapi({ example: true }),
      message: z.string().openapi({ example: 'Operation successful' }),
      data: dataSchema,
    })
  );
};

export const createEmptySuccessResponseSchema = (name: string) => {
  return registry.register(
    name,
    z.object({
      success: z.boolean().openapi({ example: true }),
      message: z.string().openapi({ example: 'Operation successful' }),
    })
  );
};
