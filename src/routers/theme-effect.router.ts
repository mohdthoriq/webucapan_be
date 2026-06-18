import { Router } from 'express';
import { ThemeEffectController } from 'controllers/themeEffectController';

const router = Router();
const controller = new ThemeEffectController();

// Mengambil daftar relasi berdasarkan Theme atau Effect
router.get('/theme/:themeId', controller.getByTheme);
router.get('/effect/:effectId', controller.getByEffect);

// Memasangkan efek ke sebuah tema (Create)
router.post('/', controller.assign);

// Melepaskan efek dari sebuah tema (Delete via 2 parameter URL)
router.delete('/:themeId/:effectId', controller.remove);

export default router;
