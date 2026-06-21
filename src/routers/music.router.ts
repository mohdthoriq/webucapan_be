import { Router } from 'express';
import { MusicController } from '../controllers/musicController';
import { validate } from '../middlewares/validate.middleware';
import {
  musicIdSchema,
  queryMusicSchema,
  createMusicSchema,
  updateMusicSchema,
} from '../validators/music.validator';

const router: Router = Router();
const controller = new MusicController();

/**
 * @swagger
 * tags:
 *   name: Music
 *   description: API for managing background music track options
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Music:
 *       type: object
 *       required:
 *         - title
 *         - file_url
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         title:
 *           type: string
 *         file_url:
 *           type: string
 *         duration_seconds:
 *           type: integer
 *           nullable: true
 *         category:
 *           type: string
 *           nullable: true
 *         is_active:
 *           type: boolean
 *           default: true
 *         created_at:
 *           type: string
 *           format: date-time
 *         updated_at:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/v1/musics:
 *   get:
 *     summary: Retrieve background music tracks list
 *     tags: [Music]
 *     parameters:
 *       - in: query
 *         name: activeOnly
 *         schema:
 *           type: string
 *           enum: ["true", "false"]
 *         description: Retrieve only active music if true
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter music by category name
 *     responses:
 *       200:
 *         description: List of music tracks
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
 *                     $ref: '#/components/schemas/Music'
 *   post:
 *     summary: Add a new music track to the library
 *     tags: [Music]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - file_url
 *             properties:
 *               title:
 *                 type: string
 *               file_url:
 *                 type: string
 *               duration_seconds:
 *                 type: integer
 *               category:
 *                 type: string
 *               is_active:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Music track created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Music'
 */

/**
 * @swagger
 * /api/v1/musics/{id}:
 *   get:
 *     summary: Get music track by ID
 *     tags: [Music]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Music track details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Music'
 *   put:
 *     summary: Update music track details
 *     tags: [Music]
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
 *               title:
 *                 type: string
 *               file_url:
 *                 type: string
 *               duration_seconds:
 *                 type: integer
 *               category:
 *                 type: string
 *               is_active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Music track updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Music'
 *   delete:
 *     summary: Delete a music track
 *     tags: [Music]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Music track deleted
 */

router.get('/', validate(queryMusicSchema), controller.getAll);
router.get('/:id', validate(musicIdSchema), controller.getById);
router.post('/', validate(createMusicSchema), controller.create);
router.put('/:id', validate(updateMusicSchema), controller.update);
router.delete('/:id', validate(musicIdSchema), controller.delete);

export default router;
