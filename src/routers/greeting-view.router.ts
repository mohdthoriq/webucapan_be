import { Router } from 'express';
import { GreetingViewController } from '../controllers/greetingViewController';
import { validate } from '../middlewares/validate.middleware';
import {
  greetingViewIdSchema,
  greetingViewByGreetingIdSchema,
  createGreetingViewSchema,
  updateGreetingViewSchema,
} from '../validators/greeting-view.validator';

const router: Router = Router();
const controller = new GreetingViewController();

/**
 * @swagger
 * tags:
 *   name: GreetingViews
 *   description: API for tracking view counts and visitor statistics of greeting cards
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     GreetingView:
 *       type: object
 *       required:
 *         - greeting_id
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         greeting_id:
 *           type: string
 *           format: uuid
 *         ip_address:
 *           type: string
 *           nullable: true
 *         user_agent:
 *           type: string
 *           nullable: true
 *         referrer:
 *           type: string
 *           nullable: true
 *         viewed_at:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/v1/greeting-view:
 *   get:
 *     summary: Retrieve all greeting view logs
 *     tags: [GreetingViews]
 *     responses:
 *       200:
 *         description: List of all views
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
 *                     $ref: '#/components/schemas/GreetingView'
 *   post:
 *     summary: Record a new view/visit event
 *     tags: [GreetingViews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - greeting_id
 *             properties:
 *               greeting_id:
 *                 type: string
 *                 format: uuid
 *               ip_address:
 *                 type: string
 *               user_agent:
 *                 type: string
 *               referrer:
 *                 type: string
 *     responses:
 *       201:
 *         description: View recorded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/GreetingView'
 */

/**
 * @swagger
 * /api/v1/greeting-view/greeting/{greetingId}:
 *   get:
 *     summary: Get view logs for a specific greeting card
 *     tags: [GreetingViews]
 *     parameters:
 *       - in: path
 *         name: greetingId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: List of views for specified greeting
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
 *                     $ref: '#/components/schemas/GreetingView'
 */

/**
 * @swagger
 * /api/v1/greeting-view/{id}:
 *   get:
 *     summary: Get a specific view log by ID
 *     tags: [GreetingViews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: View log details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/GreetingView'
 *   put:
 *     summary: Update a specific view log
 *     tags: [GreetingViews]
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
 *               ip_address:
 *                 type: string
 *               user_agent:
 *                 type: string
 *               referrer:
 *                 type: string
 *     responses:
 *       200:
 *         description: View log updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/GreetingView'
 *   delete:
 *     summary: Delete a view log
 *     tags: [GreetingViews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: View log deleted
 */

router.get('/', controller.getAll);

router.get('/greeting/:greetingId', validate(greetingViewByGreetingIdSchema), controller.getByGreetingId);

router.get('/:id', validate(greetingViewIdSchema), controller.getById);
router.post('/', validate(createGreetingViewSchema), controller.create);
router.put('/:id', validate(updateGreetingViewSchema), controller.update);
router.delete('/:id', validate(greetingViewIdSchema), controller.delete);

export default router;
