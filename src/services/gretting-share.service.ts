import { GreetingShareRepository } from '../repositories/gretting-share.repository';
import { Prisma } from '@prisma/client';

export class GreetingShareService {
  private repository: GreetingShareRepository;

  constructor() {
    this.repository = new GreetingShareRepository();
  }

  async getAllShares() {
    return this.repository.findAll();
  }

  async getShareById(id: string) {
    const shareLog = await this.repository.findById(id);
    if (!shareLog) throw new Error('Data share tidak ditemukan');
    return shareLog;
  }

  async getSharesByGreetingId(greeting_id: string) {
    return this.repository.findByGreetingId(greeting_id);
  }

  async createShare(data: Prisma.GreetingShareUncheckedCreateInput) {
    // Opsional: Kamu bisa menambahkan logika di sini untuk sekaligus 
    // menambahkan (increment) kolom `share_count` di tabel `Greeting`
    return this.repository.create(data);
  }

  async updateShare(id: string, data: Prisma.GreetingShareUncheckedUpdateInput) {
    await this.getShareById(id);
    return this.repository.update(id, data);
  }

  async deleteShare(id: string) {
    await this.getShareById(id);
    return this.repository.delete(id);
  }
}