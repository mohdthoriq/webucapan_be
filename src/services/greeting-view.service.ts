import { GreetingViewRepository } from 'repositories/greeting-view.repository';
import { Prisma } from '@prisma/client';
import { prisma } from 'config/prisma'; // Import prisma langsung jika ingin update view_count

export class GreetingViewService {
  private repository: GreetingViewRepository;

  constructor() {
    this.repository = new GreetingViewRepository();
  }

  async getAllViews() {
    return this.repository.findAll();
  }

  async getViewById(id: string) {
    const viewLog = await this.repository.findById(id);
    if (!viewLog) throw new Error('Data riwayat view tidak ditemukan');
    return viewLog;
  }

  async getViewsByGreetingId(greeting_id: string) {
    return this.repository.findByGreetingId(greeting_id);
  }

  async createView(data: Prisma.GreetingViewUncheckedCreateInput) {
    // FITUR EKSTRA: Gunakan transaksi agar penambahan log view sekaligus 
    // menambah (increment) total view_count di tabel Greeting
    const [newView] = await prisma.$transaction([
      prisma.greetingView.create({ data }),
      prisma.greeting.update({
        where: { id: data.greeting_id },
        data: { view_count: { increment: 1 } },
      }),
    ]);

    return newView;
  }

  async updateView(id: string, data: Prisma.GreetingViewUncheckedUpdateInput) {
    await this.getViewById(id);
    return this.repository.update(id, data);
  }

  async deleteView(id: string) {
    await this.getViewById(id);
    return this.repository.delete(id);
  }
}