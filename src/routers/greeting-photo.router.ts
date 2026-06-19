import { Router } from 'express';
import { GreetingPhotoController } from '../controllers/greetingPhotoController';
import { validate } from '../middlewares/validate.middleware';
import {
  greetingPhotoIdSchema,
  greetingPhotoByGreetingIdSchema,
  createGreetingPhotoSchema,
  updateGreetingPhotoSchema,
  reorderGreetingPhotoSchema,
} from '../validators/greeting-photo.validator';

const router: Router = Router();
const greetingPhotoController = new GreetingPhotoController();

router.get('/', greetingPhotoController.getAll);
router.get('/:id', validate(greetingPhotoIdSchema), greetingPhotoController.getById);
router.get('/greeting/:greetingId', validate(greetingPhotoByGreetingIdSchema), greetingPhotoController.getByGreetingId);

router.post('/', validate(createGreetingPhotoSchema), greetingPhotoController.create);

router.put('/reorder', validate(reorderGreetingPhotoSchema), greetingPhotoController.reorder);
router.put('/:id', validate(updateGreetingPhotoSchema), greetingPhotoController.update);

router.delete('/:id', validate(greetingPhotoIdSchema), greetingPhotoController.delete);

export default router;
