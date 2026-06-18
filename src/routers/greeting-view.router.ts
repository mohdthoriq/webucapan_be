import { Router } from 'express';
import { GreetingViewController } from 'controllers/greetingViewController';

const router = Router();
const controller = new GreetingViewController();

router.get('/', controller.getAll);

router.get('/greeting/:greetingId', controller.getByGreetingId);

router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;
