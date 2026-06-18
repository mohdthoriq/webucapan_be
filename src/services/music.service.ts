import { MusicRepository } from 'repositories/music.repository';
import { Prisma } from '@prisma/client';

export class MusicService {
  private repository: MusicRepository;

  constructor() {
    this.repository = new MusicRepository();
  }

  async getAllMusics(query?: { activeOnly?: boolean; category?: string }) {
    const filters = {
      ...(query?.activeOnly !== undefined && { is_active: query.activeOnly }),
      ...(query?.category && { category: query.category }),
    };
    
    return this.repository.findAll(filters);
  }

  async getMusicById(id: string) {
    const music = await this.repository.findById(id);
    if (!music) throw new Error('Musik tidak ditemukan');
    return music;
  }

  async createMusic(data: Prisma.MusicCreateInput) {
    return this.repository.create(data);
  }

  async updateMusic(id: string, data: Prisma.MusicUpdateInput) {
    await this.getMusicById(id);
    return this.repository.update(id, data);
  }

  async deleteMusic(id: string) {
    await this.getMusicById(id);
    return this.repository.delete(id);
  }
}