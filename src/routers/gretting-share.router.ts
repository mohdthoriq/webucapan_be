import { Router } from 'express';
import { GreetingShareController } from '../controllers/greetingShareController';
import { validate } from '../middlewares/validate.middleware';
import {
  greetingShareIdSchema,
  greetingShareByGreetingIdSchema,
  createGreetingShareSchema,
  updateGreetingShareSchema,
} from '../validators/greeting-share.validator';

const router: Router = Router();
const controller = new GreetingShareController();

/**
 * @swagger
 * tags:
 *   name: GreetingShares
 *   description: API for tracking sharing statistics of greeting cards
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     GreetingShare:
 *       type: object
 *       required:
 *         - greeting_id
 *         - platform
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         greeting_id:
 *           type: string
 *           format: uuid
 *         platform:
 *           type: string
 *           description: Social platform name (e.g., whatsapp, facebook, twitter, telegram, instagram, copy_link)
 *         shared_at:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/v1/greeting-share:
 *   get:
 *     summary: Retrieve all greeting share logs
 *     tags: [GreetingShares]
 *     responses:
 *       200:
 *         description: List of all shares
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
 *                     $ref: '#/components/schemas/GreetingShare'
 *   post:
 *     summary: Record a new share event
 *     tags: [GreetingShares]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - greeting_id
 *               - platform
 *             properties:
 *               greeting_id:
 *                 type: string
 *                 format: uuid
 *               platform:
 *                 type: string
 *                 example: "whatsapp"
 *     responses:
 *       201:
 *         description: Share recorded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/GreetingShare'
 */

/**
 * @swagger
 * /api/v1/greeting-share/greeting/{greetingId}:
 *   get:
 *     summary: Get share logs for a specific greeting card
 *     tags: [GreetingShares]
 *     parameters:
 *       - in: path
 *         name: greetingId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: List of shares for specified greeting
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
 *                     $ref: '#/components/schemas/GreetingShare'
 */

/**
 * @swagger
 * /api/v1/greeting-share/{id}:
 *   get:
 *     summary: Get a specific share log by ID
 *     tags: [GreetingShares]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Share log details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/GreetingShare'
 *   put:
 *     summary: Update a specific share log
 *     tags: [GreetingShares]
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
 *               platform:
 *                 type: string
 *                 example: "facebook"
 *     responses:
 *       200:
 *         description: Share log updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/GreetingShare'
 *   delete:
 *     summary: Delete a share log
 *     tags: [GreetingShares]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Share log deleted
 */

// Mengambil semua log share
router.get('/', controller.getAll);

// Mengambil log share spesifik untuk 1 kartu ucapan
router.get('/greeting/:greetingId', validate(greetingShareByGreetingIdSchema), controller.getByGreetingId);

// CRUD standard
router.get('/:id', validate(greetingShareIdSchema), controller.getById);
router.post('/', validate(createGreetingShareSchema), controller.create);
router.put('/:id', validate(updateGreetingShareSchema), controller.update);
router.delete('/:id', validate(greetingShareIdSchema), controller.delete);

export default router;
