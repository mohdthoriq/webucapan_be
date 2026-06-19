import { Router } from 'express';
import { ThemeEffectController } from '../controllers/themeEffectController';
import { validate } from '../middlewares/validate.middleware';
import {
  themeEffectParamsSchema,
  themeIdParamSchema,
  effectIdParamSchema,
  assignThemeEffectSchema,
} from '../validators/theme-effect.validator';

const router: Router = Router();
const controller = new ThemeEffectController();

// Mengambil daftar relasi berdasarkan Theme atau Effect
router.get('/theme/:themeId', validate(themeIdParamSchema), controller.getByTheme);
router.get('/effect/:effectId', validate(effectIdParamSchema), controller.getByEffect);

// Memasangkan efek ke sebuah tema (Create)
router.post('/', validate(assignThemeEffectSchema), controller.assign);

// Melepaskan efek dari sebuah tema (Delete via 2 parameter URL)
router.delete('/:themeId/:effectId', validate(themeEffectParamsSchema), controller.remove);

export default router;
