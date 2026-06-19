import { Router } from 'express';
import { GreetingSettingController } from 'controllers/grettingSettingController';
import { validate } from 'middlewares/validate.middleware';
import {
  greetingSettingIdSchema,
  upsertGreetingSettingSchema,
} from 'validators/greeting-setting.validator';

const router = Router();
const controller = new GreetingSettingController();

router.get('/:greetingId', validate(greetingSettingIdSchema), controller.getByGreetingId);
router.post('/:greetingId', validate(upsertGreetingSettingSchema), controller.upsert);
router.delete('/:greetingId', validate(greetingSettingIdSchema), controller.delete);

export default router;
