import { Router } from 'express';
import { GreetingShareController } from 'controllers/greetingShareController';
import { validate } from 'middlewares/validate.middleware';
import {
  greetingShareIdSchema,
  greetingShareByGreetingIdSchema,
  createGreetingShareSchema,
  updateGreetingShareSchema,
} from 'validators/greeting-share.validator';

const router = Router();
const controller = new GreetingShareController();

// Mengambil semua log share
router.get('/', controller.getAll);

// Mengambil log share spesifik untuk 1 kartu ucapan
router.get('/greeting/:greetingId', validate(greetingShareByGreetingIdSchema), controller.getByGreetingId);

// CRUD standard
router.get('/:id', validate(greetingShareIdSchema), controller.getById);
router.post('/', validate(createGreetingShareSchema), controller.create);
router.put('/:id', validate(updateGreetingShareSchema), controller.update);
router.delete('/:id', validate(greetingShareIdSchema), controller.delete);

export default router;
