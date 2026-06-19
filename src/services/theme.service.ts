import { ThemeRepository } from '../repositories/theme.repository';
import { Prisma } from '@prisma/client';

export class ThemeService {
  private repository: ThemeRepository;

  constructor() {
    this.repository = new ThemeRepository();
  }

  async getAllThemes(query?: { activeOnly?: boolean }) {
    return this.repository.findAll(query?.activeOnly);
  }

  async getThemeById(id: string) {
    const theme = await this.repository.findById(id);
    if (!theme) throw new Error('Tema tidak ditemukan');
    return theme;
  }

  async createTheme(data: Prisma.ThemeCreateInput) {
    // Validasi tambahan bisa dilakukan di sini, misal mengecek apakah array confetti_colors valid
    return this.repository.create(data);
  }

  async updateTheme(id: string, data: Prisma.ThemeUpdateInput) {
    await this.getThemeById(id);
    return this.repository.update(id, data);
  }

  async deleteTheme(id: string) {
    await this.getThemeById(id);
    return this.repository.delete(id);
  }
}
