import { Router } from 'express';
import { GreetingShareController } from 'controllers/greetingShareController';

const router = Router();
const controller = new GreetingShareController();

// Mengambil semua log share
router.get('/', controller.getAll);

// Mengambil log share spesifik untuk 1 kartu ucapan
router.get('/greeting/:greetingId', controller.getByGreetingId);

// CRUD standard
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;
