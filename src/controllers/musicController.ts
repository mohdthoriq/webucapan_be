import type { Request, Response } from 'express';
import { MusicService } from '../services/music.service';
import { successResponse } from '../utils/response';

const musicService = new MusicService();

export class MusicController {
  async getAll(req: Request, res: Response) {
      // Menangkap query params dari URL
      const activeOnly = req.query.activeOnly === 'true';
      const category = req.query.category as string;

      const musics = await musicService.getAllMusics({ activeOnly, category });
      successResponse(res, 'Berhasil mengambil data musik', musics)
  }

  async getById(req: Request, res: Response) {
      const music = await musicService.getMusicById(req.params.id as string);
      successResponse(res, 'Berhasil mengambil data musik', music)
  }

  async create(req: Request, res: Response) {
      const payload = req.body;
      const newMusic = await musicService.createMusic(payload);
      successResponse(res, 'Berhasil membuat musik', newMusic)
  }

  async update(req: Request, res: Response) {
      const payload = req.body;
      const updatedMusic = await musicService.updateMusic(req.params.id as string, payload);
      successResponse(res, 'Berhasil update musik', updatedMusic)
  }

  async delete(req: Request, res: Response) {
      await musicService.deleteMusic(req.params.id as string);
      successResponse(res, 'Berhasil menghapus musik', null)
  }
}
