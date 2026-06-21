import { Router } from 'express';
import { ThemeEffectController } from '../controllers/themeEffectController';
import { validate } from '../middlewares/validate.middleware';
import {
  themeEffectParamsSchema,
  themeIdParamSchema,
  effectIdParamSchema,
  assignThemeEffectSchema,
} from '../validators/theme-effect.validator';

const router: Router = Router();
const controller = new ThemeEffectController();

/**
 * @swagger
 * tags:
 *   name: ThemeEffects
 *   description: API for managing the relations between Themes and background Effects
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     ThemeEffect:
 *       type: object
 *       required:
 *         - theme_id
 *         - effect_id
 *       properties:
 *         theme_id:
 *           type: string
 *           description: The unique theme ID slug
 *         effect_id:
 *           type: string
 *           format: uuid
 *           description: The unique effect UUID
 */

/**
 * @swagger
 * /api/v1/theme-effect:
 *   post:
 *     summary: Assign a background effect to a theme
 *     tags: [ThemeEffects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - theme_id
 *               - effect_id
 *             properties:
 *               theme_id:
 *                 type: string
 *                 example: "birthday-warm"
 *               effect_id:
 *                 type: string
 *                 format: uuid
 *     responses:
 *       201:
 *         description: Effect assigned to theme successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/ThemeEffect'
 */

/**
 * @swagger
 * /api/v1/theme-effect/theme/{themeId}:
 *   get:
 *     summary: Get all effect assignments for a specific theme
 *     tags: [ThemeEffects]
 *     parameters:
 *       - in: path
 *         name: themeId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of assigned effects for the theme
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
 *                     $ref: '#/components/schemas/ThemeEffect'
 */

/**
 * @swagger
 * /api/v1/theme-effect/effect/{effectId}:
 *   get:
 *     summary: Get all themes associated with a specific background effect
 *     tags: [ThemeEffects]
 *     parameters:
 *       - in: path
 *         name: effectId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: List of themes for the effect
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
 *                     $ref: '#/components/schemas/ThemeEffect'
 */

/**
 * @swagger
 * /api/v1/theme-effect/{themeId}/{effectId}:
 *   delete:
 *     summary: Remove a background effect assignment from a theme
 *     tags: [ThemeEffects]
 *     parameters:
 *       - in: path
 *         name: themeId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: effectId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Relationship removed successfully
 */

// Mengambil daftar relasi berdasarkan Theme atau Effect
router.get('/theme/:themeId', validate(themeIdParamSchema), controller.getByTheme);
router.get('/effect/:effectId', validate(effectIdParamSchema), controller.getByEffect);

// Memasangkan efek ke sebuah tema (Create)
router.post('/', validate(assignThemeEffectSchema), controller.assign);

// Melepaskan efek dari sebuah tema (Delete via 2 parameter URL)
router.delete('/:themeId/:effectId', validate(themeEffectParamsSchema), controller.remove);

export default router;
