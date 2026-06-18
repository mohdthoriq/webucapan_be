import type { Request, Response } from 'express';
import { ThemeEffectService } from 'services/theme-effect.service';
import { successResponse } from 'utils/response';

const themeEffectService = new ThemeEffectService();

export class ThemeEffectController {
  async getByTheme(req: Request, res: Response) {
    const effects = await themeEffectService.getEffectsByTheme(req.params.themeId as string);
    successResponse(res, 'Berhasil mengambil efek berdasarkan theme', effects);
  }

  async getByEffect(req: Request, res: Response) {
      const themes = await themeEffectService.getThemesByEffect(req.params.effectId as string);
      successResponse(res, 'Berhasil mengambil theme berdasarkan efek', themes);
  }

  async assign(req: Request, res: Response) {
      // Ekspektasi payload body: { "theme_id": "string", "effect_id": "string" }
      const payload = req.body;
      const newRelation = await themeEffectService.assignEffectToTheme(payload);
      successResponse(res, 'Berhasil menambahkan efek ke theme', newRelation);
  }

  async remove(req: Request, res: Response) {
      const { themeId, effectId } = req.params;
      await themeEffectService.removeEffectFromTheme(themeId as string, effectId as string);
      successResponse(res, 'Berhasil menghapus efek dari theme', null);
  }
}
