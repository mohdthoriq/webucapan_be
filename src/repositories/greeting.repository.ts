import type { Prisma, Greeting } from '@prisma/client';
import { prisma } from 'config/prisma';

export class GreetingRepository {
  async findAll(): Promise<Greeting[]> {
    return prisma.greeting.findMany({
      orderBy: { created_at: 'desc' }
    });
  }

  async findById(id: string): Promise<Greeting | null> {
    return prisma.greeting.findUnique({
      where: { id },
      include: {
        theme: true,
        music: true,
        uploaded_music: true,
        thumbnail: true,
        photos: true,
        settings: true,
      }
    });
  }

  async findBySlug(slug: string): Promise<Greeting | null> {
    return prisma.greeting.findUnique({
      where: { slug },
      include: {
        theme: true,
        music: true,
        uploaded_music: true,
        thumbnail: true,
        photos: true,
        settings: true,
      }
    });
  }

  async create(data: Prisma.GreetingCreateInput): Promise<Greeting> {
    return prisma.greeting.create({
      data,
    });
  }

  async update(id: string, data: Prisma.GreetingUpdateInput): Promise<Greeting> {
    return prisma.greeting.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Greeting> {
    return prisma.greeting.delete({
      where: { id },
    });
  }
}