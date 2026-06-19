import { Router } from 'express';
import { GreetingViewController } from 'controllers/greetingViewController';
import { validate } from 'middlewares/validate.middleware';
import {
  greetingViewIdSchema,
  greetingViewByGreetingIdSchema,
  createGreetingViewSchema,
  updateGreetingViewSchema,
} from 'validators/greeting-view.validator';

const router = Router();
const controller = new GreetingViewController();

router.get('/', controller.getAll);

router.get('/greeting/:greetingId', validate(greetingViewByGreetingIdSchema), controller.getByGreetingId);

router.get('/:id', validate(greetingViewIdSchema), controller.getById);
router.post('/', validate(createGreetingViewSchema), controller.create);
router.put('/:id', validate(updateGreetingViewSchema), controller.update);
router.delete('/:id', validate(greetingViewIdSchema), controller.delete);

export default router;
