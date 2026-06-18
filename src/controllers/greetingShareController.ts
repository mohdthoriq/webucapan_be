import type { Request, Response } from 'express';
import { GreetingShareService } from 'services/gretting-share.service';
import { successResponse } from 'utils/response';

const shareService = new GreetingShareService();

export class GreetingShareController {
  async getAll(req: Request, res: Response) {
      const shares = await shareService.getAllShares();
      successResponse(res, 'Berhasil mengambil data log share', shares)
  }

  async getById(req: Request, res: Response) {
      const share = await shareService.getShareById(req.params.id as string);
      successResponse(res, 'Berhasil mengambil data log share', share)
  }

  async getByGreetingId(req: Request, res: Response) {
      const shares = await shareService.getSharesByGreetingId(req.params.greetingId as string);
      successResponse(res, 'Berhasil mengambil data log share berdasarkan greeting id', shares)
  }

  async create(req: Request, res: Response) {
      const payload = req.body; // Ekspektasi: { greeting_id: "uuid", platform: "whatsapp" }
      const newShare = await shareService.createShare(payload);
      successResponse(res, 'Berhasil membuat log share', newShare)
  }

  async update(req: Request, res: Response) {
      const payload = req.body;
      const updatedShare = await shareService.updateShare(req.params.id as string, payload);
      successResponse(res, 'Berhasil update log share', updatedShare);
  }

  async delete(req: Request, res: Response) {
      await shareService.deleteShare(req.params.id as string);
      successResponse(res, 'Berhasil menghapus data log share', null)
  }
}
