import { Router } from 'express';
import { ThemeController } from 'controllers/themeController';
import { validate } from 'middlewares/validate.middleware';
import {
  themeIdSchema,
  queryThemeSchema,
  createThemeSchema,
  updateThemeSchema,
} from 'validators/theme.validator';

const router = Router();
const controller = new ThemeController();

// Mengambil seluruh tema (bisa menggunakan query ?activeOnly=true)
router.get('/', validate(queryThemeSchema), controller.getAll);

// CRUD standard
router.get('/:id', validate(themeIdSchema), controller.getById);
router.post('/', validate(createThemeSchema), controller.create);
router.put('/:id', validate(updateThemeSchema), controller.update);
router.delete('/:id', validate(themeIdSchema), controller.delete);

export default router;
