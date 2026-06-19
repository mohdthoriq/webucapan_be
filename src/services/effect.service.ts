import { EffectRepository } from '../repositories/effect.repository';


export class EffectService {
  private effectRepository: EffectRepository;

  constructor() {
    this.effectRepository = new EffectRepository();
  }

  async getAllEffects() {
    return this.effectRepository.findAll();
  }

  async getEffectById(id: string) {
    const effect = await this.effectRepository.findById(id);
    if (!effect) throw new Error('Effect tidak ditemukan');
    return effect;
  }

  async createEffect(data: { name: string; code: string }) {
    // Validasi apakah code sudah ada
    const existingEffect = await this.effectRepository.findByCode(data.code);
    if (existingEffect) throw new Error('Code effect sudah digunakan');

    return this.effectRepository.create(data);
  }

  async updateEffect(id: string, data: { name?: string; code?: string }) {
    // Pastikan data ada sebelum diupdate
    await this.getEffectById(id);

    // Jika update code, pastikan code baru tidak bentrok
    if (data.code) {
      const existingEffect = await this.effectRepository.findByCode(data.code);
      if (existingEffect && existingEffect.id !== id) {
        throw new Error('Code effect sudah digunakan oleh effect lain');
      }
    }

    return this.effectRepository.update(id, data);
  }

  async deleteEffect(id: string) {
    // Pastikan data ada sebelum dihapus
    await this.getEffectById(id);
    return this.effectRepository.delete(id);
  }
}
