import { prisma } from '../config/prisma';
import { Prisma, type Music } from '@prisma/client';

export class MusicRepository {
  // Tambahkan dukungan filter dasar
  async findAll(filters?: { is_active?: boolean; category?: string }): Promise<Music[]> {
    const where: Prisma.MusicWhereInput = {};
    
    if (filters?.is_active !== undefined) {
      where.is_active = filters.is_active;
    }
    if (filters?.category) {
      where.category = filters.category;
    }

    return prisma.music.findMany({
      where,
      orderBy: { created_at: 'desc' }, // Mengurutkan dari yang terbaru ditambahkan
    });
  }

  async findById(id: string): Promise<Music | null> {
    return prisma.music.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.MusicCreateInput): Promise<Music> {
    return prisma.music.create({
      data,
    });
  }

  async update(id: string, data: Prisma.MusicUpdateInput): Promise<Music> {
    return prisma.music.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Music> {
    return prisma.music.delete({
      where: { id },
    });
  }
}