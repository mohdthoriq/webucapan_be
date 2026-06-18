import { Router } from 'express';
import { GreetingPhotoController } from 'controllers/greetingPhotoController';

const router = Router();
const greetingPhotoController = new GreetingPhotoController();

router.get('/', greetingPhotoController.getAll);
router.get('/:id', greetingPhotoController.getById);
router.get('/greeting/:greetingId', greetingPhotoController.getByGreetingId);

router.post('/', greetingPhotoController.create);

router.put('/:id', greetingPhotoController.update);

router.put('/reorder', greetingPhotoController.reorder);

router.delete('/:id', greetingPhotoController.delete);

export default router;
