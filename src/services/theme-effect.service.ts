import { ThemeEffectRepository } from 'repositories/theme-effect.repository';
import { Prisma } from '@prisma/client';

export class ThemeEffectService {
  private repository: ThemeEffectRepository;

  constructor() {
    this.repository = new ThemeEffectRepository();
  }

  async getEffectsByTheme(theme_id: string) {
    if (!theme_id) throw new Error('Theme ID harus diisi');
    return this.repository.findByThemeId(theme_id);
  }

  async getThemesByEffect(effect_id: string) {
    if (!effect_id) throw new Error('Effect ID harus diisi');
    return this.repository.findByEffectId(effect_id);
  }

  async assignEffectToTheme(data: Prisma.ThemeEffectUncheckedCreateInput) {
    // Prisma akan otomatis memunculkan error (P2002) jika kombinasi yang sama sudah ada,
    // namun kamu bisa menambahkan validasi manual di sini jika diperlukan.
    return this.repository.create(data);
  }

  async removeEffectFromTheme(theme_id: string, effect_id: string) {
    if (!theme_id || !effect_id) {
      throw new Error('Theme ID dan Effect ID wajib disertakan untuk menghapus relasi');
    }
    return this.repository.delete(theme_id, effect_id);
  }
}
