import { OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';
import { registry } from './registry';
import { bootstrapOpenApi } from './bootstrap';

// Initialize and bootstrap OpenAPI registrations
bootstrapOpenApi();

const generator = new OpenApiGeneratorV3(registry.definitions);

export const openApiDocument: Record<string, any> = generator.generateDocument({
  openapi: '3.0.0',
  info: {
    title: 'Greeting Card Platform API Documentation',
    version: '1.0.0',
    description: 'Dynamic API documentation generated from Zod validators using zod-to-openapi',
  },
  servers: [
    {
      url: '/',
      description: 'Current server',
    },
  ],
});
