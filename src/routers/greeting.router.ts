import { Router } from 'express';
import { GreetingController } from 'controllers/greetingController';
import { validate } from 'middlewares/validate.middleware';
import {
  greetingIdSchema,
  greetingSlugSchema,
  createGreetingSchema,
  updateGreetingSchema,
} from 'validators/greeting.validator';

const router: Router = Router();
const greetingController = new GreetingController();

router.get('/', greetingController.getAll);
router.get('/:id', validate(greetingIdSchema), greetingController.getById);
router.get('/slug/:slug', validate(greetingSlugSchema), greetingController.getBySlug);

router.post('/', validate(createGreetingSchema), greetingController.create);
router.put('/:id', validate(updateGreetingSchema), greetingController.update);
router.delete('/:id', validate(greetingIdSchema), greetingController.delete);

export default router;
