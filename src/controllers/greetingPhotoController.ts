import type { Request, Response } from 'express';
import { GreetingPhotoService } from '../services/greeting-photo.service';
import { successResponse } from '../utils/response';

const greetingPhotoService = new GreetingPhotoService();

const serializeData = (data: any) => {
  return JSON.parse(
    JSON.stringify(data, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    )
  );
};

export class GreetingPhotoController {
  async getAll(req: Request, res: Response) {
      const photos = await greetingPhotoService.getAllPhotos();
      successResponse(res, 'Berhasil mengambil data foto ucapan', photos)
  }

  async getById(req: Request, res: Response) {
      const photo = await greetingPhotoService.getPhotoById(req.params.id as string);
      successResponse(res, 'Berhasil mengambil data foto ucapan', photo)
  }

  async getByGreetingId(req: Request, res: Response) {
      const photos = await greetingPhotoService.getPhotosByGreetingId(req.params.greetingId as string);
      successResponse(res, 'Berhasil mengambil data foto ucapan', photos)
  }

  async create(req: Request, res: Response) {
      const payload = req.body;
      const newPhoto = await greetingPhotoService.createPhoto(payload);
      successResponse(res, 'Berhasil membuat foto ucapan', newPhoto)
  }

  async update(req: Request, res: Response) {
      const payload = req.body;
      const updatedPhoto = await greetingPhotoService.updatePhoto(req.params.id as string, payload);
      successResponse(res, 'Berhasil update foto ucapan', updatedPhoto)
  }

  async reorder(req: Request, res: Response) {
      // Ekspektasi body: { "photos": [{ "id": "uuid-1", "display_order": 1 }, { "id": "uuid-2", "display_order": 2 }] }
      const { photos } = req.body;
      const result = await greetingPhotoService.reorderPhotos(photos);
      successResponse(res, 'Berhasil reorder foto ucapan', result)
  }

  async delete(req: Request, res: Response) {
      await greetingPhotoService.deletePhoto(req.params.id as string);
      successResponse(res, 'Berhasil menghapus foto ucapan', null)
  }
}
