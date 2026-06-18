import type { Request, Response } from 'express';
import { GreetingService } from 'services/greeting.service';
import { successResponse } from 'utils/response';

const greetingService = new GreetingService();

export class GreetingController {
  async getAll(req: Request, res: Response) {
    const greetings = await greetingService.getAllGreetings();
    successResponse(res, 'Berhasil mengambil data ucapan', greetings)
  }

  async getById(req: Request, res: Response) {
    const greeting = await greetingService.getGreetingById(req.params.id as string);
    successResponse(res, 'Berhasil mengambil data ucapan', greeting)
  }

  async getBySlug(req: Request, res: Response) {
    const greeting = await greetingService.getGreetingBySlug(req.params.slug as string);
    successResponse(res, 'Berhasil mengambil data ucapan', greeting)
  }

  async create(req: Request, res: Response) {
      const payload = req.body;
      const newGreeting = await greetingService.createGreeting(payload);
    successResponse(res, 'Berhasil membuat data ucapan', newGreeting)
    }

  async update(req: Request, res: Response) {
      const payload = req.body;
      const updatedGreeting = await greetingService.updateGreeting(req.params.id as string, payload);
    successResponse(res, 'Berhasil update data ucapan', updatedGreeting)
    }

  async delete(req: Request, res: Response) {
      await greetingService.deleteGreeting(req.params.id as string);
      successResponse(res, 'Berhasil menghapus data ucapan', null)
    }
}