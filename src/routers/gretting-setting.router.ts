import { Router } from 'express';
import { GreetingSettingController } from '../controllers/grettingSettingController';
import { validate } from '../middlewares/validate.middleware';
import {
  greetingSettingIdSchema,
  upsertGreetingSettingSchema,
} from '../validators/greeting-setting.validator';

const router: Router = Router();
const controller = new GreetingSettingController();

/**
 * @swagger
 * tags:
 *   name: GreetingSettings
 *   description: API for managing greeting card configuration settings
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     GreetingSetting:
 *       type: object
 *       required:
 *         - greeting_id
 *       properties:
 *         greeting_id:
 *           type: string
 *           format: uuid
 *         autoplay_music:
 *           type: boolean
 *           default: true
 *         show_confetti:
 *           type: boolean
 *           default: true
 *         show_slideshow:
 *           type: boolean
 *           default: true
 *         allow_download_photo:
 *           type: boolean
 *           default: true
 *         created_at:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/v1/greeting-setting/{greetingId}:
 *   get:
 *     summary: Get settings for a specific greeting card
 *     tags: [GreetingSettings]
 *     parameters:
 *       - in: path
 *         name: greetingId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Greeting card settings details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/GreetingSetting'
 *   post:
 *     summary: Upsert (Create or Update) settings for a greeting card
 *     tags: [GreetingSettings]
 *     parameters:
 *       - in: path
 *         name: greetingId
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
 *               autoplay_music:
 *                 type: boolean
 *               show_confetti:
 *                 type: boolean
 *               show_slideshow:
 *                 type: boolean
 *               allow_download_photo:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Settings upserted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/GreetingSetting'
 *   delete:
 *     summary: Delete settings for a greeting card
 *     tags: [GreetingSettings]
 *     parameters:
 *       - in: path
 *         name: greetingId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Settings deleted successfully
 */

router.get('/:greetingId', validate(greetingSettingIdSchema), controller.getByGreetingId);
router.post('/:greetingId', validate(upsertGreetingSettingSchema), controller.upsert);
router.delete('/:greetingId', validate(greetingSettingIdSchema), controller.delete);

export default router;
