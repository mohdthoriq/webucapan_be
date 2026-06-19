import { Router } from 'express';
import { MusicController } from 'controllers/musicController';
import { validate } from 'middlewares/validate.middleware';
import {
  musicIdSchema,
  queryMusicSchema,
  createMusicSchema,
  updateMusicSchema,
} from 'validators/music.validator';

const router = Router();
const controller = new MusicController();

router.get('/', validate(queryMusicSchema), controller.getAll);
router.get('/:id', validate(musicIdSchema), controller.getById);
router.post('/', validate(createMusicSchema), controller.create);
router.put('/:id', validate(updateMusicSchema), controller.update);
router.delete('/:id', validate(musicIdSchema), controller.delete);

export default router;
