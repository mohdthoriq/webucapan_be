import { Router } from 'express';
import { FileController } from '../controllers/fileController';
import { validate } from '../middlewares/validate.middleware';
import { fileIdSchema, createFileSchema, updateFileSchema } from '../validators/file.validator';
import { upload, uploadMusic } from '../middlewares/upload.middleware';

const router: Router = Router();
const fileController = new FileController();

/**
 * @swagger
 * tags:
 *   name: Files
 *   description: API for managing uploaded files (Images, Music, etc.)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     File:
 *       type: object
 *       required:
 *         - file_url
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         file_name:
 *           type: string
 *           nullable: true
 *         file_url:
 *           type: string
 *         file_type:
 *           type: string
 *           nullable: true
 *         mime_type:
 *           type: string
 *           nullable: true
 *         file_size:
 *           type: string
 *           description: BigInt represented as string
 *           nullable: true
 *         storage_path:
 *           type: string
 *           nullable: true
 *         created_at:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/v1/files:
 *   get:
 *     summary: Get all files
 *     tags: [Files]
 *     responses:
 *       200:
 *         description: List of files
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
 *                   example: "Get all files successfully"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/File'
 *   post:
 *     summary: Register a file metadata manually
 *     tags: [Files]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - file_url
 *             properties:
 *               file_name:
 *                 type: string
 *               file_url:
 *                 type: string
 *               file_type:
 *                 type: string
 *               mime_type:
 *                 type: string
 *               file_size:
 *                 type: integer
 *               storage_path:
 *                 type: string
 *     responses:
 *       201:
 *         description: File record created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/File'
 */

/**
 * @swagger
 * /api/v1/files/{id}:
 *   get:
 *     summary: Get file by ID
 *     tags: [Files]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: File details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/File'
 *   put:
 *     summary: Update file metadata
 *     tags: [Files]
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
 *               file_name:
 *                 type: string
 *               file_url:
 *                 type: string
 *     responses:
 *       200:
 *         description: File updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/File'
 *   delete:
 *     summary: Delete file record
 *     tags: [Files]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: File record deleted
 */

/**
 * @swagger
 * /api/v1/files/upload/images:
 *   post:
 *     summary: Upload multiple images to Cloudinary
 *     tags: [Files]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - images
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Image files to upload (max 10)
 *     responses:
 *       201:
 *         description: Images uploaded successfully
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
 *                   example: "Upload foto-foto berhasil"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/File'
 */

/**
 * @swagger
 * /api/v1/files/upload/music:
 *   post:
 *     summary: Upload a single music/audio file locally
 *     tags: [Files]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - music
 *             properties:
 *               music:
 *                 type: string
 *                 format: binary
 *                 description: Audio file to upload
 *     responses:
 *       201:
 *         description: Music file uploaded successfully
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
 *                   example: "Upload musik berhasil"
 *                 data:
 *                   $ref: '#/components/schemas/File'
 */

// Definisikan rute CRUD untuk File
router.get('/', fileController.getAll);
router.get('/:id', validate(fileIdSchema), fileController.getById);
router.post('/', validate(createFileSchema), fileController.create);
router.put('/:id', validate(updateFileSchema), fileController.update);
router.delete('/:id', validate(fileIdSchema), fileController.delete);

// Rute upload file baru
router.post('/upload/images', upload.array('images', 10), fileController.uploadMultipleImages);
router.post('/upload/music', uploadMusic.single('music'), fileController.uploadSingleMusic);

export default router;
