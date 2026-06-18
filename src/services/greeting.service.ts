import { GreetingRepository } from 'repositories/greeting.repository';
import type { Prisma } from '@prisma/client';

export class GreetingService {
  private greetingRepository: GreetingRepository;

  constructor() {
    this.greetingRepository = new GreetingRepository();
  }

  private generateSlug(length = 8): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  async getAllGreetings() {
    return this.greetingRepository.findAll();
  }

  async getGreetingById(id: string) {
    const greeting = await this.greetingRepository.findById(id);
    if (!greeting) throw new Error('Greeting tidak ditemukan');
    return greeting;
  }

  async getGreetingBySlug(slug: string) {
    const greeting = await this.greetingRepository.findBySlug(slug);
    if (!greeting) throw new Error('Greeting tidak ditemukan');
    return greeting;
  }

  async createGreeting(data: Prisma.GreetingCreateInput) {
    // Generate slug unik jika belum disediakan
    if (!data.slug) {
      let isUnique = false;
      let newSlug = '';
      
      while (!isUnique) {
        newSlug = this.generateSlug();
        const existing = await this.greetingRepository.findBySlug(newSlug);
        if (!existing) isUnique = true;
      }
      data.slug = newSlug;
    } else {
      // Pastikan slug manual dari user tidak bentrok
      const existing = await this.greetingRepository.findBySlug(data.slug as string);
      if (existing) throw new Error('Slug sudah digunakan');
    }

    return this.greetingRepository.create(data);
  }

  async updateGreeting(id: string, data: Prisma.GreetingUpdateInput) {
    // Validasi data exist
    await this.getGreetingById(id);

    // Mencegah update slug yang bentrok dengan milik orang lain (opsional)
    if (data.slug) {
      const existing = await this.greetingRepository.findBySlug(data.slug as string);
      if (existing && existing.id !== id) {
        throw new Error('Slug sudah digunakan oleh greeting lain');
      }
    }

    return this.greetingRepository.update(id, data);
  }

  async deleteGreeting(id: string) {
    await this.getGreetingById(id);
    return this.greetingRepository.delete(id);
  }
}
