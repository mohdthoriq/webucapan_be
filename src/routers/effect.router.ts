import { Router } from 'express';
import { EffectController } from 'controllers/effectController';

const router = Router();
const effectController = new EffectController();

// Definisikan rute CRUD
router.get('/', effectController.getAll);
router.get('/:id', effectController.getById);
router.post('/', effectController.create);
router.put('/:id', effectController.update);
router.delete('/:id', effectController.delete);

export default router;
