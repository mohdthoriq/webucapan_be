import { z } from 'zod';
import { registry } from './registry';
import {
  createSuccessResponseSchema,
  createEmptySuccessResponseSchema,
} from './components/response';
import { createPaginationResponseSchema } from './components/pagination';
import {
  validationErrorResponseSchema,
  errorResponseSchema,
  unauthorizedResponseSchema,
  forbiddenResponseSchema,
  notFoundResponseSchema,
  conflictResponseSchema,
  internalServerErrorResponseSchema,
} from './components/error';

// Import existing validators
import { createEffectSchema, updateEffectSchema, effectIdSchema } from '../validators/effect.validator';
import { createThemeSchema, updateThemeSchema, themeIdSchema, queryThemeSchema } from '../validators/theme.validator';
import { createMusicSchema, updateMusicSchema, musicIdSchema, queryMusicSchema } from '../validators/music.validator';
import { createGreetingSchema, updateGreetingSchema, greetingIdSchema, greetingSlugSchema } from '../validators/greeting.validator';
import {
  createGreetingPhotoSchema,
  updateGreetingPhotoSchema,
  greetingPhotoIdSchema,
  greetingPhotoByGreetingIdSchema,
  reorderGreetingPhotoSchema,
} from '../validators/greeting-photo.validator';
import { greetingSettingIdSchema, upsertGreetingSettingSchema } from '../validators/greeting-setting.validator';
import {
  createGreetingShareSchema,
  updateGreetingShareSchema,
  greetingShareIdSchema,
  greetingShareByGreetingIdSchema,
} from '../validators/greeting-share.validator';
import {
  createGreetingViewSchema,
  updateGreetingViewSchema,
  greetingViewIdSchema,
  greetingViewByGreetingIdSchema,
} from '../validators/greeting-view.validator';
import { createFileSchema, updateFileSchema, fileIdSchema } from '../validators/file.validator';
import {
  assignThemeEffectSchema,
  themeEffectParamsSchema,
  themeIdParamSchema,
  effectIdParamSchema,
} from '../validators/theme-effect.validator';

// ----------------------------------------------------
// Base Model Schemas
// ----------------------------------------------------

export const EffectModel = registry.register(
  'Effect',
  z.object({
    id: z.string().uuid(),
    name: z.string(),
    code: z.string(),
    created_at: z.string().datetime(),
  })
);

export const ThemeModel = registry.register(
  'Theme',
  z.object({
    id: z.string(),
    name: z.string(),
    emoji: z.string().nullable(),
    background_gradient: z.string(),
    confetti_colors: z.array(z.string()).nullable(),
    is_active: z.boolean(),
    created_at: z.string().datetime(),
  })
);

export const MusicModel = registry.register(
  'Music',
  z.object({
    id: z.string().uuid(),
    title: z.string(),
    file_url: z.string(),
    duration_seconds: z.number().nullable(),
    category: z.string().nullable(),
    is_active: z.boolean(),
    created_at: z.string().datetime(),
  })
);

export const GreetingModel = registry.register(
  'Greeting',
  z.object({
    id: z.string().uuid(),
    slug: z.string(),
    recipient_name: z.string(),
    occasion: z.string(),
    message: z.string(),
    sender_name: z.string(),
    theme_id: z.string(),
    music_source: z.string(),
    music_id: z.string().uuid().nullable(),
    uploaded_music_file_id: z.string().uuid().nullable(),
    thumbnail_file_id: z.string().uuid().nullable(),
    status: z.string(),
    expires_at: z.string().datetime().nullable(),
    created_at: z.string().datetime(),
  })
);

export const GreetingPhotoModel = registry.register(
  'GreetingPhoto',
  z.object({
    id: z.string().uuid(),
    greeting_id: z.string().uuid(),
    file_id: z.string().uuid(),
    display_order: z.number(),
    caption: z.string().nullable(),
    created_at: z.string().datetime(),
  })
);

export const GreetingSettingModel = registry.register(
  'GreetingSetting',
  z.object({
    greeting_id: z.string().uuid(),
    autoplay_music: z.boolean(),
    show_confetti: z.boolean(),
    show_slideshow: z.boolean(),
    allow_download_photo: z.boolean(),
  })
);

export const GreetingShareModel = registry.register(
  'GreetingShare',
  z.object({
    id: z.string().uuid(),
    greeting_id: z.string().uuid(),
    platform: z.string(),
    created_at: z.string().datetime(),
  })
);

export const GreetingViewModel = registry.register(
  'GreetingView',
  z.object({
    id: z.string().uuid(),
    greeting_id: z.string().uuid(),
    ip_address: z.string().nullable(),
    user_agent: z.string().nullable(),
    referrer: z.string().nullable(),
    created_at: z.string().datetime(),
  })
);

export const FileModel = registry.register(
  'File',
  z.object({
    id: z.string().uuid(),
    file_name: z.string().nullable(),
    file_url: z.string(),
    file_type: z.string().nullable(),
    mime_type: z.string().nullable(),
    file_size: z.union([z.number(), z.string(), z.bigint()]).nullable(),
    storage_path: z.string().nullable(),
    created_at: z.string().datetime(),
  })
);

export const ThemeEffectModel = registry.register(
  'ThemeEffect',
  z.object({
    theme_id: z.string(),
    effect_id: z.string().uuid(),
    created_at: z.string().datetime(),
  })
);

// ----------------------------------------------------
// Path Registrations
// ----------------------------------------------------

export const bootstrapOpenApi = () => {
  // 1. Effects
  registry.registerPath({
    method: 'get',
    path: '/api/v1/effect',
    tags: ['Effects'],
    summary: 'Retrieve all effects',
    description: 'Get a list of all background greeting effects.',
    operationId: 'getAllEffects',
    responses: {
      200: {
        description: 'List of all effects',
        content: {
          'application/json': {
            schema: createSuccessResponseSchema(z.array(EffectModel), 'EffectListResponse'),
          },
        },
      },
    },
  });

  registry.registerPath({
    method: 'get',
    path: '/api/v1/effect/{id}',
    tags: ['Effects'],
    summary: 'Get an effect by ID',
    description: 'Retrieve details of a specific effect.',
    operationId: 'getEffectById',
    request: {
      params: effectIdSchema.shape.params,
    },
    responses: {
      200: {
        description: 'Effect details',
        content: {
          'application/json': {
            schema: createSuccessResponseSchema(EffectModel, 'SingleEffectResponse'),
          },
        },
      },
      404: {
        description: 'Effect not found',
        content: { 'application/json': { schema: notFoundResponseSchema } },
      },
    },
  });

  registry.registerPath({
    method: 'post',
    path: '/api/v1/effect',
    tags: ['Effects'],
    summary: 'Create a new effect',
    description: 'Create a new effect preset.',
    operationId: 'createEffect',
    request: {
      body: {
        content: {
          'application/json': {
            schema: createEffectSchema.shape.body,
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Effect created successfully',
        content: {
          'application/json': {
            schema: createSuccessResponseSchema(EffectModel, 'CreateEffectResponse'),
          },
        },
      },
      400: {
        description: 'Validation error',
        content: { 'application/json': { schema: validationErrorResponseSchema } },
      },
    },
  });

  registry.registerPath({
    method: 'put',
    path: '/api/v1/effect/{id}',
    tags: ['Effects'],
    summary: 'Update an effect',
    description: 'Modify an existing effect.',
    operationId: 'updateEffect',
    request: {
      params: updateEffectSchema.shape.params,
      body: {
        content: {
          'application/json': {
            schema: updateEffectSchema.shape.body,
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Effect updated successfully',
        content: {
          'application/json': {
            schema: createSuccessResponseSchema(EffectModel, 'UpdateEffectResponse'),
          },
        },
      },
      400: {
        description: 'Validation error',
        content: { 'application/json': { schema: validationErrorResponseSchema } },
      },
      404: {
        description: 'Effect not found',
        content: { 'application/json': { schema: notFoundResponseSchema } },
      },
    },
  });

  registry.registerPath({
    method: 'delete',
    path: '/api/v1/effect/{id}',
    tags: ['Effects'],
    summary: 'Delete an effect',
    description: 'Remove an effect preset.',
    operationId: 'deleteEffect',
    request: {
      params: effectIdSchema.shape.params,
    },
    responses: {
      200: {
        description: 'Effect deleted successfully',
        content: {
          'application/json': {
            schema: createEmptySuccessResponseSchema('DeleteEffectResponse'),
          },
        },
      },
      404: {
        description: 'Effect not found',
        content: { 'application/json': { schema: notFoundResponseSchema } },
      },
    },
  });

  // 2. Themes
  registry.registerPath({
    method: 'get',
    path: '/api/v1/themes',
    tags: ['Themes'],
    summary: 'Retrieve all themes',
    description: 'Get a list of all themes.',
    operationId: 'getAllThemes',
    request: {
      query: queryThemeSchema.shape.query,
    },
    responses: {
      200: {
        description: 'List of all themes',
        content: {
          'application/json': {
            schema: createSuccessResponseSchema(z.array(ThemeModel), 'ThemeListResponse'),
          },
        },
      },
    },
  });

  registry.registerPath({
    method: 'get',
    path: '/api/v1/themes/{id}',
    tags: ['Themes'],
    summary: 'Get a theme by ID',
    description: 'Retrieve details of a specific theme.',
    operationId: 'getThemeById',
    request: {
      params: themeIdSchema.shape.params,
    },
    responses: {
      200: {
        description: 'Theme details',
        content: {
          'application/json': {
            schema: createSuccessResponseSchema(ThemeModel, 'SingleThemeResponse'),
          },
        },
      },
      404: {
        description: 'Theme not found',
        content: { 'application/json': { schema: notFoundResponseSchema } },
      },
    },
  });

  registry.registerPath({
    method: 'post',
    path: '/api/v1/themes',
    tags: ['Themes'],
    summary: 'Create a new theme',
    description: 'Create a new theme styling preset.',
    operationId: 'createTheme',
    request: {
      body: {
        content: {
          'application/json': {
            schema: createThemeSchema.shape.body,
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Theme created successfully',
        content: {
          'application/json': {
            schema: createSuccessResponseSchema(ThemeModel, 'CreateThemeResponse'),
          },
        },
      },
      400: {
        description: 'Validation error',
        content: { 'application/json': { schema: validationErrorResponseSchema } },
      },
    },
  });

  registry.registerPath({
    method: 'put',
    path: '/api/v1/themes/{id}',
    tags: ['Themes'],
    summary: 'Update a theme',
    description: 'Modify an existing theme preset.',
    operationId: 'updateTheme',
    request: {
      params: updateThemeSchema.shape.params,
      body: {
        content: {
          'application/json': {
            schema: updateThemeSchema.shape.body,
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Theme updated successfully',
        content: {
          'application/json': {
            schema: createSuccessResponseSchema(ThemeModel, 'UpdateThemeResponse'),
          },
        },
      },
      400: {
        description: 'Validation error',
        content: { 'application/json': { schema: validationErrorResponseSchema } },
      },
      404: {
        description: 'Theme not found',
        content: { 'application/json': { schema: notFoundResponseSchema } },
      },
    },
  });

  registry.registerPath({
    method: 'delete',
    path: '/api/v1/themes/{id}',
    tags: ['Themes'],
    summary: 'Delete a theme',
    description: 'Remove a theme preset.',
    operationId: 'deleteTheme',
    request: {
      params: themeIdSchema.shape.params,
    },
    responses: {
      200: {
        description: 'Theme deleted successfully',
        content: {
          'application/json': {
            schema: createEmptySuccessResponseSchema('DeleteThemeResponse'),
          },
        },
      },
      404: {
        description: 'Theme not found',
        content: { 'application/json': { schema: notFoundResponseSchema } },
      },
    },
  });

  // 3. Music
  registry.registerPath({
    method: 'get',
    path: '/api/v1/musics',
    tags: ['Music'],
    summary: 'Retrieve all music',
    description: 'Get a list of all background music tracks.',
    operationId: 'getAllMusic',
    request: {
      query: queryMusicSchema.shape.query,
    },
    responses: {
      200: {
        description: 'List of all music tracks',
        content: {
          'application/json': {
            schema: createSuccessResponseSchema(z.array(MusicModel), 'MusicListResponse'),
          },
        },
      },
    },
  });

  registry.registerPath({
    method: 'get',
    path: '/api/v1/musics/{id}',
    tags: ['Music'],
    summary: 'Get music by ID',
    description: 'Retrieve details of a specific music track.',
    operationId: 'getMusicById',
    request: {
      params: musicIdSchema.shape.params,
    },
    responses: {
      200: {
        description: 'Music details',
        content: {
          'application/json': {
            schema: createSuccessResponseSchema(MusicModel, 'SingleMusicResponse'),
          },
        },
      },
      404: {
        description: 'Music track not found',
        content: { 'application/json': { schema: notFoundResponseSchema } },
      },
    },
  });

  registry.registerPath({
    method: 'post',
    path: '/api/v1/musics',
    tags: ['Music'],
    summary: 'Create a new music track',
    description: 'Add a new music track to the library.',
    operationId: 'createMusic',
    request: {
      body: {
        content: {
          'application/json': {
            schema: createMusicSchema.shape.body,
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Music track created successfully',
        content: {
          'application/json': {
            schema: createSuccessResponseSchema(MusicModel, 'CreateMusicResponse'),
          },
        },
      },
      400: {
        description: 'Validation error',
        content: { 'application/json': { schema: validationErrorResponseSchema } },
      },
    },
  });

  registry.registerPath({
    method: 'put',
    path: '/api/v1/musics/{id}',
    tags: ['Music'],
    summary: 'Update music track',
    description: 'Modify an existing music track metadata.',
    operationId: 'updateMusic',
    request: {
      params: updateMusicSchema.shape.params,
      body: {
        content: {
          'application/json': {
            schema: updateMusicSchema.shape.body,
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Music track updated successfully',
        content: {
          'application/json': {
            schema: createSuccessResponseSchema(MusicModel, 'UpdateMusicResponse'),
          },
        },
      },
      400: {
        description: 'Validation error',
        content: { 'application/json': { schema: validationErrorResponseSchema } },
      },
      404: {
        description: 'Music track not found',
        content: { 'application/json': { schema: notFoundResponseSchema } },
      },
    },
  });

  registry.registerPath({
    method: 'delete',
    path: '/api/v1/musics/{id}',
    tags: ['Music'],
    summary: 'Delete music track',
    description: 'Remove a music track from the library.',
    operationId: 'deleteMusic',
    request: {
      params: musicIdSchema.shape.params,
    },
    responses: {
      200: {
        description: 'Music track deleted successfully',
        content: {
          'application/json': {
            schema: createEmptySuccessResponseSchema('DeleteMusicResponse'),
          },
        },
      },
      404: {
        description: 'Music track not found',
        content: { 'application/json': { schema: notFoundResponseSchema } },
      },
    },
  });

  // 4. Greetings
  registry.registerPath({
    method: 'get',
    path: '/api/v1/greeting',
    tags: ['Greetings'],
    summary: 'Retrieve all greetings',
    description: 'Get a list of all greetings.',
    operationId: 'getAllGreetings',
    responses: {
      200: {
        description: 'List of all greetings',
        content: {
          'application/json': {
            schema: createSuccessResponseSchema(z.array(GreetingModel), 'GreetingListResponse'),
          },
        },
      },
    },
  });

  registry.registerPath({
    method: 'get',
    path: '/api/v1/greeting/{id}',
    tags: ['Greetings'],
    summary: 'Get greeting by ID',
    description: 'Retrieve details of a specific greeting card.',
    operationId: 'getGreetingById',
    request: {
      params: greetingIdSchema.shape.params,
    },
    responses: {
      200: {
        description: 'Greeting details',
        content: {
          'application/json': {
            schema: createSuccessResponseSchema(GreetingModel, 'SingleGreetingResponse'),
          },
        },
      },
      404: {
        description: 'Greeting not found',
        content: { 'application/json': { schema: notFoundResponseSchema } },
      },
    },
  });

  registry.registerPath({
    method: 'get',
    path: '/api/v1/greeting/slug/{slug}',
    tags: ['Greetings'],
    summary: 'Get greeting by Slug',
    description: 'Retrieve details of a greeting card by its unique slug.',
    operationId: 'getGreetingBySlug',
    request: {
      params: greetingSlugSchema.shape.params,
    },
    responses: {
      200: {
        description: 'Greeting details',
        content: {
          'application/json': {
            schema: createSuccessResponseSchema(GreetingModel, 'GreetingBySlugResponse'),
          },
        },
      },
      404: {
        description: 'Greeting not found',
        content: { 'application/json': { schema: notFoundResponseSchema } },
      },
    },
  });

  registry.registerPath({
    method: 'post',
    path: '/api/v1/greeting',
    tags: ['Greetings'],
    summary: 'Create a new greeting card',
    description: 'Add a new greeting card.',
    operationId: 'createGreeting',
    request: {
      body: {
        content: {
          'application/json': {
            schema: createGreetingSchema.shape.body,
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Greeting card created successfully',
        content: {
          'application/json': {
            schema: createSuccessResponseSchema(GreetingModel, 'CreateGreetingResponse'),
          },
        },
      },
      400: {
        description: 'Validation error',
        content: { 'application/json': { schema: validationErrorResponseSchema } },
      },
    },
  });

  registry.registerPath({
    method: 'put',
    path: '/api/v1/greeting/{id}',
    tags: ['Greetings'],
    summary: 'Update greeting card',
    description: 'Modify an existing greeting card.',
    operationId: 'updateGreeting',
    request: {
      params: updateGreetingSchema.shape.params,
      body: {
        content: {
          'application/json': {
            schema: updateGreetingSchema.shape.body,
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Greeting card updated successfully',
        content: {
          'application/json': {
            schema: createSuccessResponseSchema(GreetingModel, 'UpdateGreetingResponse'),
          },
        },
      },
      400: {
        description: 'Validation error',
        content: { 'application/json': { schema: validationErrorResponseSchema } },
      },
      404: {
        description: 'Greeting card not found',
        content: { 'application/json': { schema: notFoundResponseSchema } },
      },
    },
  });

  registry.registerPath({
    method: 'delete',
    path: '/api/v1/greeting/{id}',
    tags: ['Greetings'],
    summary: 'Delete greeting card',
    description: 'Remove a greeting card.',
    operationId: 'deleteGreeting',
    request: {
      params: greetingIdSchema.shape.params,
    },
    responses: {
      200: {
        description: 'Greeting card deleted successfully',
        content: {
          'application/json': {
            schema: createEmptySuccessResponseSchema('DeleteGreetingResponse'),
          },
        },
      },
      404: {
        description: 'Greeting card not found',
        content: { 'application/json': { schema: notFoundResponseSchema } },
      },
    },
  });

  // 5. Greeting Photo
  registry.registerPath({
    method: 'get',
    path: '/api/v1/greeting-photo',
    tags: ['Greeting Photos'],
    summary: 'Retrieve all greeting photos',
    description: 'Get a list of all greeting photos.',
    operationId: 'getAllGreetingPhotos',
    responses: {
      200: {
        description: 'List of greeting photos',
        content: {
          'application/json': {
            schema: createSuccessResponseSchema(z.array(GreetingPhotoModel), 'GreetingPhotoListResponse'),
          },
        },
      },
    },
  });

  registry.registerPath({
    method: 'get',
    path: '/api/v1/greeting-photo/{id}',
    tags: ['Greeting Photos'],
    summary: 'Get greeting photo by ID',
    description: 'Retrieve details of a specific greeting photo.',
    operationId: 'getGreetingPhotoById',
    request: {
      params: greetingPhotoIdSchema.shape.params,
    },
    responses: {
      200: {
        description: 'Greeting photo details',
        content: {
          'application/json': {
            schema: createSuccessResponseSchema(GreetingPhotoModel, 'SingleGreetingPhotoResponse'),
          },
        },
      },
      404: {
        description: 'Greeting photo not found',
        content: { 'application/json': { schema: notFoundResponseSchema } },
      },
    },
  });

  registry.registerPath({
    method: 'get',
    path: '/api/v1/greeting-photo/greeting/{greetingId}',
    tags: ['Greeting Photos'],
    summary: 'Get greeting photos by greeting card ID',
    description: 'Retrieve all photos associated with a specific greeting card.',
    operationId: 'getGreetingPhotosByGreetingId',
    request: {
      params: greetingPhotoByGreetingIdSchema.shape.params,
    },
    responses: {
      200: {
        description: 'Greeting photos list',
        content: {
          'application/json': {
            schema: createSuccessResponseSchema(z.array(GreetingPhotoModel), 'GreetingPhotosByGreetingResponse'),
          },
        },
      },
    },
  });

  registry.registerPath({
    method: 'post',
    path: '/api/v1/greeting-photo',
    tags: ['Greeting Photos'],
    summary: 'Create a new greeting photo link',
    description: 'Attach an uploaded file to a greeting card as a photo.',
    operationId: 'createGreetingPhoto',
    request: {
      body: {
        content: {
          'application/json': {
            schema: createGreetingPhotoSchema.shape.body,
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Greeting photo attached successfully',
        content: {
          'application/json': {
            schema: createSuccessResponseSchema(GreetingPhotoModel, 'CreateGreetingPhotoResponse'),
          },
        },
      },
      400: {
        description: 'Validation error',
        content: { 'application/json': { schema: validationErrorResponseSchema } },
      },
    },
  });

  registry.registerPath({
    method: 'put',
    path: '/api/v1/greeting-photo/reorder',
    tags: ['Greeting Photos'],
    summary: 'Reorder greeting photos',
    description: 'Update the displaying order sequence of greeting photos.',
    operationId: 'reorderGreetingPhotos',
    request: {
      body: {
        content: {
          'application/json': {
            schema: reorderGreetingPhotoSchema.shape.body,
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Greeting photos reordered successfully',
        content: {
          'application/json': {
            schema: createEmptySuccessResponseSchema('ReorderGreetingPhotosResponse'),
          },
        },
      },
    },
  });

  registry.registerPath({
    method: 'put',
    path: '/api/v1/greeting-photo/{id}',
    tags: ['Greeting Photos'],
    summary: 'Update greeting photo',
    description: 'Modify greeting photo order or caption.',
    operationId: 'updateGreetingPhoto',
    request: {
      params: updateGreetingPhotoSchema.shape.params,
      body: {
        content: {
          'application/json': {
            schema: updateGreetingPhotoSchema.shape.body,
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Greeting photo updated successfully',
        content: {
          'application/json': {
            schema: createSuccessResponseSchema(GreetingPhotoModel, 'UpdateGreetingPhotoResponse'),
          },
        },
      },
      404: {
        description: 'Greeting photo not found',
        content: { 'application/json': { schema: notFoundResponseSchema } },
      },
    },
  });

  registry.registerPath({
    method: 'delete',
    path: '/api/v1/greeting-photo/{id}',
    tags: ['Greeting Photos'],
    summary: 'Delete greeting photo',
    description: 'Remove a photo association from a greeting card.',
    operationId: 'deleteGreetingPhoto',
    request: {
      params: greetingPhotoIdSchema.shape.params,
    },
    responses: {
      200: {
        description: 'Greeting photo deleted successfully',
        content: {
          'application/json': {
            schema: createEmptySuccessResponseSchema('DeleteGreetingPhotoResponse'),
          },
        },
      },
      404: {
        description: 'Greeting photo not found',
        content: { 'application/json': { schema: notFoundResponseSchema } },
      },
    },
  });

  // 6. Greeting Setting
  registry.registerPath({
    method: 'get',
    path: '/api/v1/greeting-setting/{greetingId}',
    tags: ['Greeting Settings'],
    summary: 'Get settings by greeting ID',
    description: 'Retrieve styling and interaction settings for a specific greeting card.',
    operationId: 'getGreetingSettingByGreetingId',
    request: {
      params: greetingSettingIdSchema.shape.params,
    },
    responses: {
      200: {
        description: 'Greeting settings details',
        content: {
          'application/json': {
            schema: createSuccessResponseSchema(GreetingSettingModel, 'SingleGreetingSettingResponse'),
          },
        },
      },
      404: {
        description: 'Greeting settings not found',
        content: { 'application/json': { schema: notFoundResponseSchema } },
      },
    },
  });

  registry.registerPath({
    method: 'post',
    path: '/api/v1/greeting-setting/{greetingId}',
    tags: ['Greeting Settings'],
    summary: 'Upsert greeting settings',
    description: 'Create or update settings configuration for a greeting card.',
    operationId: 'upsertGreetingSetting',
    request: {
      params: upsertGreetingSettingSchema.shape.params,
      body: {
        content: {
          'application/json': {
            schema: upsertGreetingSettingSchema.shape.body,
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Greeting settings upserted successfully',
        content: {
          'application/json': {
            schema: createSuccessResponseSchema(GreetingSettingModel, 'UpsertGreetingSettingResponse'),
          },
        },
      },
    },
  });

  registry.registerPath({
    method: 'delete',
    path: '/api/v1/greeting-setting/{greetingId}',
    tags: ['Greeting Settings'],
    summary: 'Delete greeting settings',
    description: 'Reset/delete settings for a greeting card.',
    operationId: 'deleteGreetingSetting',
    request: {
      params: greetingSettingIdSchema.shape.params,
    },
    responses: {
      200: {
        description: 'Greeting settings deleted successfully',
        content: {
          'application/json': {
            schema: createEmptySuccessResponseSchema('DeleteGreetingSettingResponse'),
          },
        },
      },
    },
  });

  // 7. Greeting Share
  registry.registerPath({
    method: 'get',
    path: '/api/v1/greeting-share',
    tags: ['Greeting Shares'],
    summary: 'Retrieve all share logs',
    description: 'Get a list of all greeting card share logs.',
    operationId: 'getAllGreetingShares',
    responses: {
      200: {
        description: 'List of share logs',
        content: {
          'application/json': {
            schema: createSuccessResponseSchema(z.array(GreetingShareModel), 'GreetingShareListResponse'),
          },
        },
      },
    },
  });

  registry.registerPath({
    method: 'get',
    path: '/api/v1/greeting-share/greeting/{greetingId}',
    tags: ['Greeting Shares'],
    summary: 'Get share logs by greeting ID',
    description: 'Retrieve share statistics logs for a specific greeting card.',
    operationId: 'getGreetingSharesByGreetingId',
    request: {
      params: greetingShareByGreetingIdSchema.shape.params,
    },
    responses: {
      200: {
        description: 'Greeting share logs list',
        content: {
          'application/json': {
            schema: createSuccessResponseSchema(z.array(GreetingShareModel), 'GreetingSharesByGreetingResponse'),
          },
        },
      },
    },
  });

  registry.registerPath({
    method: 'get',
    path: '/api/v1/greeting-share/{id}',
    tags: ['Greeting Shares'],
    summary: 'Get share log by ID',
    description: 'Retrieve details of a specific greeting card share log.',
    operationId: 'getGreetingShareById',
    request: {
      params: greetingShareIdSchema.shape.params,
    },
    responses: {
      200: {
        description: 'Greeting share log details',
        content: {
          'application/json': {
            schema: createSuccessResponseSchema(GreetingShareModel, 'SingleGreetingShareResponse'),
          },
        },
      },
      404: {
        description: 'Share log not found',
        content: { 'application/json': { schema: notFoundResponseSchema } },
      },
    },
  });

  registry.registerPath({
    method: 'post',
    path: '/api/v1/greeting-share',
    tags: ['Greeting Shares'],
    summary: 'Log a share event',
    description: 'Create a log record when a greeting card is shared.',
    operationId: 'createGreetingShare',
    request: {
      body: {
        content: {
          'application/json': {
            schema: createGreetingShareSchema.shape.body,
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Greeting share logged successfully',
        content: {
          'application/json': {
            schema: createSuccessResponseSchema(GreetingShareModel, 'CreateGreetingShareResponse'),
          },
        },
      },
    },
  });

  registry.registerPath({
    method: 'put',
    path: '/api/v1/greeting-share/{id}',
    tags: ['Greeting Shares'],
    summary: 'Update a share log',
    description: 'Modify an existing greeting share record.',
    operationId: 'updateGreetingShare',
    request: {
      params: updateGreetingShareSchema.shape.params,
      body: {
        content: {
          'application/json': {
            schema: updateGreetingShareSchema.shape.body,
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Greeting share log updated successfully',
        content: {
          'application/json': {
            schema: createSuccessResponseSchema(GreetingShareModel, 'UpdateGreetingShareResponse'),
          },
        },
      },
    },
  });

  registry.registerPath({
    method: 'delete',
    path: '/api/v1/greeting-share/{id}',
    tags: ['Greeting Shares'],
    summary: 'Delete a share log',
    description: 'Remove a share log record.',
    operationId: 'deleteGreetingShare',
    request: {
      params: greetingShareIdSchema.shape.params,
    },
    responses: {
      200: {
        description: 'Greeting share log deleted successfully',
        content: {
          'application/json': {
            schema: createEmptySuccessResponseSchema('DeleteGreetingShareResponse'),
          },
        },
      },
    },
  });

  // 8. Greeting View
  registry.registerPath({
    method: 'get',
    path: '/api/v1/greeting-view',
    tags: ['Greeting Views'],
    summary: 'Retrieve all view logs',
    description: 'Get a list of all greeting card view logs.',
    operationId: 'getAllGreetingViews',
    responses: {
      200: {
        description: 'List of view logs',
        content: {
          'application/json': {
            schema: createSuccessResponseSchema(z.array(GreetingViewModel), 'GreetingViewListResponse'),
          },
        },
      },
    },
  });

  registry.registerPath({
    method: 'get',
    path: '/api/v1/greeting-view/greeting/{greetingId}',
    tags: ['Greeting Views'],
    summary: 'Get view logs by greeting ID',
    description: 'Retrieve view history logs for a specific greeting card.',
    operationId: 'getGreetingViewsByGreetingId',
    request: {
      params: greetingViewByGreetingIdSchema.shape.params,
    },
    responses: {
      200: {
        description: 'Greeting view logs list',
        content: {
          'application/json': {
            schema: createSuccessResponseSchema(z.array(GreetingViewModel), 'GreetingViewsByGreetingResponse'),
          },
        },
      },
    },
  });

  registry.registerPath({
    method: 'get',
    path: '/api/v1/greeting-view/{id}',
    tags: ['Greeting Views'],
    summary: 'Get view log by ID',
    description: 'Retrieve details of a specific greeting card view log.',
    operationId: 'getGreetingViewById',
    request: {
      params: greetingViewIdSchema.shape.params,
    },
    responses: {
      200: {
        description: 'Greeting view log details',
        content: {
          'application/json': {
            schema: createSuccessResponseSchema(GreetingViewModel, 'SingleGreetingViewResponse'),
          },
        },
      },
      404: {
        description: 'View log not found',
        content: { 'application/json': { schema: notFoundResponseSchema } },
      },
    },
  });

  registry.registerPath({
    method: 'post',
    path: '/api/v1/greeting-view',
    tags: ['Greeting Views'],
    summary: 'Log a view event',
    description: 'Create a log record when a greeting card is viewed.',
    operationId: 'createGreetingView',
    request: {
      body: {
        content: {
          'application/json': {
            schema: createGreetingViewSchema.shape.body,
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Greeting view logged successfully',
        content: {
          'application/json': {
            schema: createSuccessResponseSchema(GreetingViewModel, 'CreateGreetingViewResponse'),
          },
        },
      },
    },
  });

  registry.registerPath({
    method: 'put',
    path: '/api/v1/greeting-view/{id}',
    tags: ['Greeting Views'],
    summary: 'Update a view log',
    description: 'Modify an existing view record.',
    operationId: 'updateGreetingView',
    request: {
      params: updateGreetingViewSchema.shape.params,
      body: {
        content: {
          'application/json': {
            schema: updateGreetingViewSchema.shape.body,
          },
        },
      },
    },
    responses: {
      200: {
        description: 'Greeting view log updated successfully',
        content: {
          'application/json': {
            schema: createSuccessResponseSchema(GreetingViewModel, 'UpdateGreetingViewResponse'),
          },
        },
      },
    },
  });

  registry.registerPath({
    method: 'delete',
    path: '/api/v1/greeting-view/{id}',
    tags: ['Greeting Views'],
    summary: 'Delete a view log',
    description: 'Remove a view log record.',
    operationId: 'deleteGreetingView',
    request: {
      params: greetingViewIdSchema.shape.params,
    },
    responses: {
      200: {
        description: 'Greeting view log deleted successfully',
        content: {
          'application/json': {
            schema: createEmptySuccessResponseSchema('DeleteGreetingViewResponse'),
          },
        },
      },
    },
  });

  // 9. Files
  registry.registerPath({
    method: 'get',
    path: '/api/v1/files',
    tags: ['Files'],
    summary: 'Retrieve all files',
    description: 'Get a list of all uploaded file records.',
    operationId: 'getAllFiles',
    responses: {
      200: {
        description: 'List of all files',
        content: {
          'application/json': {
            schema: createSuccessResponseSchema(z.array(FileModel), 'FileListResponse'),
          },
        },
      },
    },
  });

  registry.registerPath({
    method: 'get',
    path: '/api/v1/files/{id}',
    tags: ['Files'],
    summary: 'Get file record by ID',
    description: 'Retrieve details of a specific uploaded file record.',
    operationId: 'getFileById',
    request: {
      params: fileIdSchema.shape.params,
    },
    responses: {
      200: {
        description: 'File details',
        content: {
          'application/json': {
            schema: createSuccessResponseSchema(FileModel, 'SingleFileResponse'),
          },
        },
      },
      404: {
        description: 'File not found',
        content: { 'application/json': { schema: notFoundResponseSchema } },
      },
    },
  });

  registry.registerPath({
    method: 'post',
    path: '/api/v1/files',
    tags: ['Files'],
    summary: 'Create a new file record',
    description: 'Add a new file metadata record manually.',
    operationId: 'createFile',
    request: {
      body: {
        content: {
          'application/json': {
            schema: createFileSchema.shape.body,
          },
        },
      },
    },
    responses: {
      201: {
        description: 'File record created successfully',
        content: {
          'application/json': {
            schema: createSuccessResponseSchema(FileModel, 'CreateFileResponse'),
          },
        },
      },
    },
  });

  registry.registerPath({
    method: 'put',
    path: '/api/v1/files/{id}',
    tags: ['Files'],
    summary: 'Update file record',
    description: 'Modify file record metadata.',
    operationId: 'updateFile',
    request: {
      params: updateFileSchema.shape.params,
      body: {
        content: {
          'application/json': {
            schema: updateFileSchema.shape.body,
          },
        },
      },
    },
    responses: {
      200: {
        description: 'File record updated successfully',
        content: {
          'application/json': {
            schema: createSuccessResponseSchema(FileModel, 'UpdateFileResponse'),
          },
        },
      },
    },
  });

  registry.registerPath({
    method: 'delete',
    path: '/api/v1/files/{id}',
    tags: ['Files'],
    summary: 'Delete file record',
    description: 'Remove a file metadata record.',
    operationId: 'deleteFile',
    request: {
      params: fileIdSchema.shape.params,
    },
    responses: {
      200: {
        description: 'File record deleted successfully',
        content: {
          'application/json': {
            schema: createEmptySuccessResponseSchema('DeleteFileResponse'),
          },
        },
      },
    },
  });

  registry.registerPath({
    method: 'post',
    path: '/api/v1/files/upload/images',
    tags: ['Files'],
    summary: 'Upload multiple images',
    description: 'Upload up to 10 image files to Cloudinary.',
    operationId: 'uploadMultipleImages',
    request: {
      body: {
        content: {
          'multipart/form-data': {
            schema: z.object({
              images: z.array(z.string().openapi({ type: 'string', format: 'binary' })).openapi({
                description: 'Array of image files to upload',
              }),
            }),
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Images uploaded successfully',
        content: {
          'application/json': {
            schema: createSuccessResponseSchema(z.array(FileModel), 'UploadImagesResponse'),
          },
        },
      },
    },
  });

  registry.registerPath({
    method: 'post',
    path: '/api/v1/files/upload/music',
    tags: ['Files'],
    summary: 'Upload single music file',
    description: 'Upload a single music/audio file locally.',
    operationId: 'uploadSingleMusic',
    request: {
      body: {
        content: {
          'multipart/form-data': {
            schema: z.object({
              music: z.string().openapi({ type: 'string', format: 'binary', description: 'Audio file to upload' }),
            }),
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Music uploaded successfully',
        content: {
          'application/json': {
            schema: createSuccessResponseSchema(FileModel, 'UploadMusicResponse'),
          },
        },
      },
    },
  });

  // 10. Theme Effect Connections
  registry.registerPath({
    method: 'get',
    path: '/api/v1/theme-effect/theme/{themeId}',
    tags: ['Theme Effects'],
    summary: 'Get effects by theme ID',
    description: 'Retrieve all linked effects for a specific theme.',
    operationId: 'getThemeEffectsByTheme',
    request: {
      params: themeIdParamSchema.shape.params,
    },
    responses: {
      200: {
        description: 'List of theme effects',
        content: {
          'application/json': {
            schema: createSuccessResponseSchema(z.array(ThemeEffectModel), 'ThemeEffectsByThemeResponse'),
          },
        },
      },
    },
  });

  registry.registerPath({
    method: 'get',
    path: '/api/v1/theme-effect/effect/{effectId}',
    tags: ['Theme Effects'],
    summary: 'Get themes by effect ID',
    description: 'Retrieve all linked themes for a specific effect.',
    operationId: 'getThemeEffectsByEffect',
    request: {
      params: effectIdParamSchema.shape.params,
    },
    responses: {
      200: {
        description: 'List of theme effects',
        content: {
          'application/json': {
            schema: createSuccessResponseSchema(z.array(ThemeEffectModel), 'ThemeEffectsByEffectResponse'),
          },
        },
      },
    },
  });

  registry.registerPath({
    method: 'post',
    path: '/api/v1/theme-effect',
    tags: ['Theme Effects'],
    summary: 'Link theme and effect',
    description: 'Assign a background effect to a theme preset.',
    operationId: 'assignThemeEffect',
    request: {
      body: {
        content: {
          'application/json': {
            schema: assignThemeEffectSchema.shape.body,
          },
        },
      },
    },
    responses: {
      201: {
        description: 'Theme and effect linked successfully',
        content: {
          'application/json': {
            schema: createSuccessResponseSchema(ThemeEffectModel, 'AssignThemeEffectResponse'),
          },
        },
      },
    },
  });

  registry.registerPath({
    method: 'delete',
    path: '/api/v1/theme-effect/{themeId}/{effectId}',
    tags: ['Theme Effects'],
    summary: 'Unlink theme and effect',
    description: 'Remove the link between a theme and an effect.',
    operationId: 'unlinkThemeEffect',
    request: {
      params: themeEffectParamsSchema.shape.params,
    },
    responses: {
      200: {
        description: 'Theme and effect unlinked successfully',
        content: {
          'application/json': {
            schema: createEmptySuccessResponseSchema('UnlinkThemeEffectResponse'),
          },
        },
      },
    },
  });
};
