import { Router } from 'express';
import { GreetingController } from '../controllers/greetingController';
import { validate } from '../middlewares/validate.middleware';
import {
  greetingIdSchema,
  greetingSlugSchema,
  createGreetingSchema,
  updateGreetingSchema,
} from '../validators/greeting.validator';

const router: Router = Router();
const greetingController = new GreetingController();

/**
 * @swagger
 * tags:
 *   name: Greetings
 *   description: API for managing greeting cards
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Greeting:
 *       type: object
 *       required:
 *         - slug
 *         - recipient_name
 *         - occasion
 *         - message
 *         - sender_name
 *         - theme_id
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         slug:
 *           type: string
 *         recipient_name:
 *           type: string
 *         occasion:
 *           type: string
 *         message:
 *           type: string
 *         sender_name:
 *           type: string
 *         theme_id:
 *           type: string
 *         music_source:
 *           type: string
 *           enum: [library, upload]
 *           default: library
 *         music_id:
 *           type: string
 *           format: uuid
 *           nullable: true
 *         uploaded_music_file_id:
 *           type: string
 *           format: uuid
 *           nullable: true
 *         thumbnail_file_id:
 *           type: string
 *           format: uuid
 *           nullable: true
 *         status:
 *           type: string
 *           enum: [draft, published, expired, deleted]
 *           default: draft
 *         view_count:
 *           type: integer
 *           default: 0
 *         share_count:
 *           type: integer
 *           default: 0
 *         expires_at:
 *           type: string
 *           format: date-time
 *           nullable: true
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/v1/greeting:
 *   get:
 *     summary: Get all greetings
 *     tags: [Greetings]
 *     responses:
 *       200:
 *         description: List of greetings
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Greeting'
 *   post:
 *     summary: Create a new greeting card
 *     tags: [Greetings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - recipient_name
 *               - occasion
 *               - message
 *               - sender_name
 *               - theme_id
 *             properties:
 *               recipient_name:
 *                 type: string
 *               occasion:
 *                 type: string
 *               message:
 *                 type: string
 *               sender_name:
 *                 type: string
 *               theme_id:
 *                 type: string
 *               music_source:
 *                 type: string
 *                 enum: [library, upload]
 *               music_id:
 *                 type: string
 *                 format: uuid
 *               uploaded_music_file_id:
 *                 type: string
 *                 format: uuid
 *               thumbnail_file_id:
 *                 type: string
 *                 format: uuid
 *               expires_at:
 *                 type: string
 *                 format: date-time
 *               status:
 *                 type: string
 *                 enum: [draft, published]
 *     responses:
 *       201:
 *         description: Greeting created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Greeting'
 */

/**
 * @swagger
 * /api/v1/greeting/{id}:
 *   get:
 *     summary: Get greeting by ID
 *     tags: [Greetings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Greeting details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Greeting'
 *   put:
 *     summary: Update an existing greeting
 *     tags: [Greetings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               recipient_name:
 *                 type: string
 *               occasion:
 *                 type: string
 *               message:
 *                 type: string
 *               sender_name:
 *                 type: string
 *               theme_id:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [draft, published, expired, deleted]
 *     responses:
 *       200:
 *         description: Greeting updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Greeting'
 *   delete:
 *     summary: Delete a greeting
 *     tags: [Greetings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Greeting deleted
 */

/**
 * @swagger
 * /api/v1/greeting/slug/{slug}:
 *   get:
 *     summary: Get greeting by its 8-character slug
 *     tags: [Greetings]
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Greeting details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Greeting'
 */

router.get('/', greetingController.getAll);
router.get('/:id', validate(greetingIdSchema), greetingController.getById);
router.get('/slug/:slug', validate(greetingSlugSchema), greetingController.getBySlug);

router.post('/', validate(createGreetingSchema), greetingController.create);
router.put('/:id', validate(updateGreetingSchema), greetingController.update);
router.delete('/:id', validate(greetingIdSchema), greetingController.delete);

export default router;
