import { Router } from 'express';
import { GreetingController } from 'controllers/greetingController';

const router = Router();
const greetingController = new GreetingController();

router.get('/', greetingController.getAll);
router.get('/:id', greetingController.getById);
router.get('/slug/:slug', greetingController.getBySlug);

router.post('/', greetingController.create);
router.put('/:id', greetingController.update);
router.delete('/:id', greetingController.delete);

export default router;
