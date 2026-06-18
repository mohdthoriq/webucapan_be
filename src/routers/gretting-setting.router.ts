import { Router } from 'express';
import { GreetingSettingController } from 'controllers/grettingSettingController';

const router = Router();
const controller = new GreetingSettingController();

router.get('/:greetingId', controller.getByGreetingId);
router.post('/:greetingId', controller.upsert);
router.delete('/:greetingId', controller.delete);

export default router;
