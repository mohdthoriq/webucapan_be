import { Router } from 'express';
import { GreetingPhotoController } from '../controllers/greetingPhotoController';
import { validate } from '../middlewares/validate.middleware';
import {
  greetingPhotoIdSchema,
  greetingPhotoByGreetingIdSchema,
  createGreetingPhotoSchema,
  updateGreetingPhotoSchema,
  reorderGreetingPhotoSchema,
} from '../validators/greeting-photo.validator';

const router: Router = Router();
const greetingPhotoController = new GreetingPhotoController();

/**
 * @swagger
 * tags:
 *   name: GreetingPhotos
 *   description: API for managing photos attached to greetings
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     GreetingPhoto:
 *       type: object
 *       required:
 *         - greeting_id
 *         - file_id
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         greeting_id:
 *           type: string
 *           format: uuid
 *         file_id:
 *           type: string
 *           format: uuid
 *         display_order:
 *           type: integer
 *           default: 1
 *         caption:
 *           type: string
 *           nullable: true
 *         created_at:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/v1/greeting-photo:
 *   get:
 *     summary: Get all greeting photos
 *     tags: [GreetingPhotos]
 *     responses:
 *       200:
 *         description: List of all greeting photos
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
 *                     $ref: '#/components/schemas/GreetingPhoto'
 *   post:
 *     summary: Create a greeting photo link
 *     tags: [GreetingPhotos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - greeting_id
 *               - file_id
 *             properties:
 *               greeting_id:
 *                 type: string
 *                 format: uuid
 *               file_id:
 *                 type: string
 *                 format: uuid
 *               display_order:
 *                 type: integer
 *                 default: 1
 *               caption:
 *                 type: string
 *     responses:
 *       201:
 *         description: Greeting photo linked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/GreetingPhoto'
 */

/**
 * @swagger
 * /api/v1/greeting-photo/reorder:
 *   put:
 *     summary: Reorder greeting photos display order
 *     tags: [GreetingPhotos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - photos
 *             properties:
 *               photos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - id
 *                     - display_order
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                     display_order:
 *                       type: integer
 *     responses:
 *       200:
 *         description: Order updated successfully
 */

/**
 * @swagger
 * /api/v1/greeting-photo/{id}:
 *   get:
 *     summary: Get greeting photo by ID
 *     tags: [GreetingPhotos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Greeting photo details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/GreetingPhoto'
 *   put:
 *     summary: Update greeting photo caption or display order
 *     tags: [GreetingPhotos]
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
 *               display_order:
 *                 type: integer
 *               caption:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/GreetingPhoto'
 *   delete:
 *     summary: Remove greeting photo link
 *     tags: [GreetingPhotos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Deleted successfully
 */

/**
 * @swagger
 * /api/v1/greeting-photo/greeting/{greetingId}:
 *   get:
 *     summary: Get all photos for a specific greeting
 *     tags: [GreetingPhotos]
 *     parameters:
 *       - in: path
 *         name: greetingId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: List of photos for greeting
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
 *                     $ref: '#/components/schemas/GreetingPhoto'
 */

router.get('/', greetingPhotoController.getAll);
router.get('/:id', validate(greetingPhotoIdSchema), greetingPhotoController.getById);
router.get('/greeting/:greetingId', validate(greetingPhotoByGreetingIdSchema), greetingPhotoController.getByGreetingId);

router.post('/', validate(createGreetingPhotoSchema), greetingPhotoController.create);

router.put('/reorder', validate(reorderGreetingPhotoSchema), greetingPhotoController.reorder);
router.put('/:id', validate(updateGreetingPhotoSchema), greetingPhotoController.update);

router.delete('/:id', validate(greetingPhotoIdSchema), greetingPhotoController.delete);

export default router;
