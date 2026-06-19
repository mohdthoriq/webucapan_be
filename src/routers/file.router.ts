import { Router } from 'express';
import { FileController } from 'controllers/fileController';
import { validate } from 'middlewares/validate.middleware';
import { fileIdSchema, createFileSchema, updateFileSchema } from 'validators/file.validator';

const router = Router();
const fileController = new FileController();

// Definisikan rute CRUD untuk File
router.get('/', fileController.getAll);
router.get('/:id', validate(fileIdSchema), fileController.getById);
router.post('/', validate(createFileSchema), fileController.create);
router.put('/:id', validate(updateFileSchema), fileController.update);
router.delete('/:id', validate(fileIdSchema), fileController.delete);

export default router;
