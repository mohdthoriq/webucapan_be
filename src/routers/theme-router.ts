import { Router } from 'express';
import { ThemeController } from 'controllers/themeController';

const router = Router();
const controller = new ThemeController();

// Mengambil seluruh tema (bisa menggunakan query ?activeOnly=true)
router.get('/', controller.getAll);

// CRUD standard
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export default router;
