import type { Request, Response } from 'express';
import { ThemeService } from '../services/theme.service';
import { successResponse } from '../utils/response';

const themeService = new ThemeService();

export class ThemeController {
  async getAll(req: Request, res: Response) {
      // Menangkap query param ?activeOnly=true
      const activeOnly = req.query.activeOnly === 'true';
      
      const themes = await themeService.getAllThemes({ activeOnly });
      successResponse(res, 'Berhasil mendapatkan data theme', themes);
  }

  async getById(req: Request, res: Response) {
      const theme = await themeService.getThemeById(req.params.id as string);
      successResponse(res, 'Berhasil mendapatkan data theme', theme);
  }

  async create(req: Request, res: Response) {
      const payload = req.body;
      /*
        Contoh payload untuk JSON (confetti_colors):
        {
          "name": "Romantic Red",
          "emoji": "❤️",
          "background_gradient": "linear-gradient(to right, #ff9999, #ffcc99)",
          "confetti_colors": ["#ff0000", "#ffffff", "#ff4d4d"]
        }
      */
      const newTheme = await themeService.createTheme(payload);
      successResponse(res, 'Berhasil membuat theme', newTheme);
  }

  async update(req: Request, res: Response) {
      const payload = req.body;
      const updatedTheme = await themeService.updateTheme(req.params.id as string, payload);
      successResponse(res, 'Berhasil update theme', updatedTheme);
  }

  async delete(req: Request, res: Response) {
      await themeService.deleteTheme(req.params.id as string);
      successResponse(res, 'Berhasil delete theme', null);
  }
}
