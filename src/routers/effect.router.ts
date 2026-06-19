import { Router } from 'express';
import { EffectController } from 'controllers/effectController';
import { validate } from 'middlewares/validate.middleware';
import { createEffectSchema, updateEffectSchema } from 'validators/effect.validator';

const router: Router = Router();
const effectController = new EffectController();

// Definisikan rute CRUD
router.get('/', effectController.getAll);
router.get('/:id', effectController.getById);
router.post('/', validate(createEffectSchema), effectController.create);
router.put('/:id', validate(updateEffectSchema), effectController.update);
router.delete('/:id', effectController.delete);

export default router;
