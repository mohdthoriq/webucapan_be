import { Router } from 'express';
import { ThemeController } from '../controllers/themeController';
import { validate } from '../middlewares/validate.middleware';
import {
  themeIdSchema,
  queryThemeSchema,
  createThemeSchema,
  updateThemeSchema,
} from '../validators/theme.validator';

const router: Router = Router();
const controller = new ThemeController();

/**
 * @swagger
 * tags:
 *   name: Themes
 *   description: API for managing greeting card themes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Theme:
 *       type: object
 *       required:
 *         - id
 *         - name
 *         - background_gradient
 *       properties:
 *         id:
 *           type: string
 *           description: Unique theme ID slug (e.g., birthday-warm)
 *         name:
 *           type: string
 *         emoji:
 *           type: string
 *           nullable: true
 *         background_gradient:
 *           type: string
 *         confetti_colors:
 *           type: array
 *           items:
 *             type: string
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
 * /api/v1/themes:
 *   get:
 *     summary: Get all themes
 *     tags: [Themes]
 *     parameters:
 *       - in: query
 *         name: activeOnly
 *         schema:
 *           type: string
 *           enum: ["true", "false"]
 *         description: Retrieve only active themes if true
 *     responses:
 *       200:
 *         description: List of themes
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
 *                     $ref: '#/components/schemas/Theme'
 *   post:
 *     summary: Create a new theme
 *     tags: [Themes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *               - background_gradient
 *             properties:
 *               id:
 *                 type: string
 *                 example: "new-theme"
 *               name:
 *                 type: string
 *               emoji:
 *                 type: string
 *               background_gradient:
 *                 type: string
 *               confetti_colors:
 *                 type: array
 *                 items:
 *                   type: string
 *               is_active:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Theme created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Theme'
 */

/**
 * @swagger
 * /api/v1/themes/{id}:
 *   get:
 *     summary: Get theme by ID
 *     tags: [Themes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Theme details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Theme'
 *   put:
 *     summary: Update an existing theme
 *     tags: [Themes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               emoji:
 *                 type: string
 *               background_gradient:
 *                 type: string
 *               confetti_colors:
 *                 type: array
 *                 items:
 *                   type: string
 *               is_active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Theme updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Theme'
 *   delete:
 *     summary: Delete a theme
 *     tags: [Themes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Theme deleted
 */

// Mengambil seluruh tema (bisa menggunakan query ?activeOnly=true)
router.get('/', validate(queryThemeSchema), controller.getAll);

// CRUD standard
router.get('/:id', validate(themeIdSchema), controller.getById);
router.post('/', validate(createThemeSchema), controller.create);
router.put('/:id', validate(updateThemeSchema), controller.update);
router.delete('/:id', validate(themeIdSchema), controller.delete);

export default router;
