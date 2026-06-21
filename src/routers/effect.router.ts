import { Router } from 'express';
import { EffectController } from '../controllers/effectController';
import { validate } from '../middlewares/validate.middleware';
import { createEffectSchema, updateEffectSchema } from '../validators/effect.validator';

const router: Router = Router();
const effectController = new EffectController();

/**
 * @swagger
 * tags:
 *   name: Effects
 *   description: API for managing background greeting effects
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Effect:
 *       type: object
 *       required:
 *         - name
 *         - code
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: Unique ID of the effect.
 *         name:
 *           type: string
 *           description: Display name of the effect.
 *         code:
 *           type: string
 *           description: Unique system code for the effect.
 *         created_at:
 *           type: string
 *           format: date-time
 *       example:
 *         id: "123e4567-e89b-12d3-a456-426614174000"
 *         name: "Confetti Rain"
 *         code: "confetti_rain"
 *         created_at: "2026-06-20T13:13:27.000Z"
 */

/**
 * @swagger
 * /api/v1/effect:
 *   get:
 *     summary: Retrieve all effects
 *     tags: [Effects]
 *     responses:
 *       200:
 *         description: List of all effects
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Get all effects successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Effect'
 *   post:
 *     summary: Create a new effect
 *     tags: [Effects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - code
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Confetti Rain"
 *               code:
 *                 type: string
 *                 example: "confetti_rain"
 *     responses:
 *       201:
 *         description: Effect created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Create effect successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Effect'
 */

/**
 * @swagger
 * /api/v1/effect/{id}:
 *   get:
 *     summary: Get an effect by ID
 *     tags: [Effects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The effect ID
 *     responses:
 *       200:
 *         description: Effect details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Get effect successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Effect'
 *   put:
 *     summary: Update an effect
 *     tags: [Effects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The effect ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Sparkling Stars"
 *               code:
 *                 type: string
 *                 example: "star_sparkle"
 *     responses:
 *       200:
 *         description: Effect updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Update effect successfully"
 *                 data:
 *                   $ref: '#/components/schemas/Effect'
 *   delete:
 *     summary: Delete an effect
 *     tags: [Effects]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: The effect ID
 *     responses:
 *       200:
 *         description: Effect deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Delete effect successfully"
 */

// Definisikan rute CRUD
router.get('/', effectController.getAll);
router.get('/:id', effectController.getById);
router.post('/', validate(createEffectSchema), effectController.create);
router.put('/:id', validate(updateEffectSchema), effectController.update);
router.delete('/:id', effectController.delete);

export default router;

