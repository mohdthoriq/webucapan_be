import { Router } from 'express';
import { FileController } from 'controllers/fileController';

const router = Router();
const fileController = new FileController();

// Definisikan rute CRUD untuk File
router.get('/', fileController.getAll);
router.get('/:id', fileController.getById);
router.post('/', fileController.create);
router.put('/:id', fileController.update);
router.delete('/:id', fileController.delete);

export default router;
