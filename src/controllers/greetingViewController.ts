import type { Request, Response } from 'express';
import { GreetingViewService } from 'services/greeting-view.service';
import { successResponse } from 'utils/response';

const viewService = new GreetingViewService();

export class GreetingViewController {
  async getAll(req: Request, res: Response) {
      const views = await viewService.getAllViews();
      successResponse(res, 'Berhasil mendapatkan semua data log view', views);
  }

  async getById(req: Request, res: Response) {
      const viewLog = await viewService.getViewById(req.params.id as string);
      successResponse(res, 'Berhasil mendapatkan data log view', viewLog)
  }

  async getByGreetingId(req: Request, res: Response) {
      const views = await viewService.getViewsByGreetingId(req.params.greetingId as string);
      successResponse(res, 'Berhasil mendapatkan data log view berdasarkan greeting id', views)
  }

  async create(req: Request, res: Response) {
      // Hanya butuh greeting_id dari body request
      const { greeting_id } = req.body;

      if (!greeting_id) {
        throw new Error('greeting_id wajib diisi')
      }

      // Ambil data analitik secara otomatis dari header request
      const payload = {
        greeting_id,
        ip_address: req.ip || req.headers['x-forwarded-for']?.toString() || null,
        user_agent: req.headers['user-agent'] || null,
        referrer: req.headers['referer'] || null,
      };

      const newView = await viewService.createView(payload);
      successResponse(res, 'Berhasil menambahkan data log view', newView);
  }

  async update(req: Request, res: Response) {
      const payload = req.body;
      const updatedView = await viewService.updateView(req.params.id as string, payload);
      successResponse(res, 'Data log view berhasil diupdate', updatedView);
  }

  async delete(req: Request, res: Response) {
      await viewService.deleteView(req.params.id as string);
      successResponse(res, 'Data log view berhasil dihapus');
  }
}
