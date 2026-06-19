import type { Request, Response } from 'express';
import { GreetingSettingService } from '../services/gretting-setting.service';
import { successResponse } from '../utils/response';

const settingService = new GreetingSettingService();

export class GreetingSettingController {
  async getByGreetingId(req: Request, res: Response) {
      const setting = await settingService.getSettingByGreetingId(req.params.greetingId as string);
      successResponse(res, 'Berhasil mengambil data pengaturan kartu ucapan', setting)
  }

  // Controller gabungan untuk Create / Update
  async upsert(req: Request, res: Response) {
      const { greetingId } = req.params;
      const payload = req.body;
      
      const savedSetting = await settingService.upsertSetting(greetingId as string, payload);
      successResponse(res, 'Berhasil membuat/update data pengaturan kartu ucapan', savedSetting);
  }

  async delete(req: Request, res: Response) {
    await settingService.deleteSetting(req.params.greetingId as string);
    successResponse(res, 'Berhasil menghapus data pengaturan kartu ucapan', null)
  }
}
