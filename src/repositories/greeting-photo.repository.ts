import { prisma } from '../config/prisma';
import { Prisma, type GreetingPhoto } from '@prisma/client';

export class GreetingPhotoRepository {
  async findAll(): Promise<GreetingPhoto[]> {
    return prisma.greetingPhoto.findMany({
      include: { file: true }
    });
  }

  async findById(id: string): Promise<GreetingPhoto | null> {
    return prisma.greetingPhoto.findUnique({
      where: { id },
      include: { file: true }
    });
  }

  async findByGreetingId(greeting_id: string): Promise<GreetingPhoto[]> {
    return prisma.greetingPhoto.findMany({
      where: { greeting_id },
      orderBy: { display_order: 'asc' },
      include: { file: true }
    });
  }

  async create(data: Prisma.GreetingPhotoUncheckedCreateInput): Promise<GreetingPhoto> {
    return prisma.greetingPhoto.create({
      data,
    });
  }

  async update(id: string, data: Prisma.GreetingPhotoUncheckedUpdateInput): Promise<GreetingPhoto> {
    return prisma.greetingPhoto.update({
      where: { id },
      data,
    });
  }

  // FITUR EKSTRA: Bulk update untuk reorder
  async updateBulkOrder(photos: { id: string; display_order: number }[]): Promise<void> {
    const transactions = photos.map((photo) =>
      prisma.greetingPhoto.update({
        where: { id: photo.id },
        data: { display_order: photo.display_order },
      })
    );
    
    // Eksekusi semua update secara bersamaan dalam satu transaksi
    await prisma.$transaction(transactions);
  }

  async delete(id: string): Promise<GreetingPhoto> {
    return prisma.greetingPhoto.delete({
      where: { id },
    });
  }
}
