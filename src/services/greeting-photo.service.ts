import { GreetingPhotoRepository } from 'repositories/greeting-photo.repository';
import { Prisma } from '@prisma/client';

export class GreetingPhotoService {
  private repository: GreetingPhotoRepository;

  constructor() {
    this.repository = new GreetingPhotoRepository();
  }

  async getAllPhotos() {
    return this.repository.findAll();
  }

  async getPhotoById(id: string) {
    const photo = await this.repository.findById(id);
    if (!photo) throw new Error('Foto tidak ditemukan');
    return photo;
  }

  async getPhotosByGreetingId(greeting_id: string) {
    return this.repository.findByGreetingId(greeting_id);
  }

  async createPhoto(data: Prisma.GreetingPhotoUncheckedCreateInput) {
    return this.repository.create(data);
  }

  async updatePhoto(id: string, data: Prisma.GreetingPhotoUncheckedUpdateInput) {
    await this.getPhotoById(id);
    return this.repository.update(id, data);
  }

  // FITUR EKSTRA: Logika bisnis reorder
  async reorderPhotos(photos: { id: string; display_order: number }[]) {
    if (!Array.isArray(photos) || photos.length === 0) {
      throw new Error('Data urutan foto tidak valid');
    }
    
    await this.repository.updateBulkOrder(photos);
    return { message: 'Urutan foto berhasil diperbarui' };
  }

  async deletePhoto(id: string) {
    await this.getPhotoById(id);
    return this.repository.delete(id);
  }
}
