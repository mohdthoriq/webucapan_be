import { z } from 'zod';
import { registry } from '../registry';

export const validationErrorSchema = registry.register(
  'ValidationErrorDetail',
  z.object({
    field: z.string().openapi({ example: 'email' }),
    message: z.string().openapi({ example: 'Email format is invalid' }),
  })
);

export const validationErrorResponseSchema = registry.register(
  'ValidationErrorResponse',
  z.object({
    success: z.boolean().openapi({ example: false }),
    status: z.number().openapi({ example: 400 }),
    message: z.string().openapi({ example: 'Validation failed' }),
    errors: z.array(validationErrorSchema),
  })
);

export const errorResponseSchema = registry.register(
  'ErrorResponse',
  z.object({
    success: z.boolean().openapi({ example: false }),
    status: z.number().openapi({ example: 400 }),
    message: z.string().openapi({ example: 'Bad Request' }),
  })
);

export const unauthorizedResponseSchema = registry.register(
  'UnauthorizedResponse',
  z.object({
    success: z.boolean().openapi({ example: false }),
    status: z.number().openapi({ example: 401 }),
    message: z.string().openapi({ example: 'Unauthorized access' }),
  })
);

export const forbiddenResponseSchema = registry.register(
  'ForbiddenResponse',
  z.object({
    success: z.boolean().openapi({ example: false }),
    status: z.number().openapi({ example: 403 }),
    message: z.string().openapi({ example: 'Forbidden access' }),
  })
);

export const notFoundResponseSchema = registry.register(
  'NotFoundResponse',
  z.object({
    success: z.boolean().openapi({ example: false }),
    status: z.number().openapi({ example: 404 }),
    message: z.string().openapi({ example: 'Resource not found' }),
  })
);

export const conflictResponseSchema = registry.register(
  'ConflictResponse',
  z.object({
    success: z.boolean().openapi({ example: false }),
    status: z.number().openapi({ example: 409 }),
    message: z.string().openapi({ example: 'Conflict' }),
  })
);

export const internalServerErrorResponseSchema = registry.register(
  'InternalServerErrorResponse',
  z.object({
    success: z.boolean().openapi({ example: false }),
    status: z.number().openapi({ example: 500 }),
    message: z.string().openapi({ example: 'Internal server error' }),
  })
);
