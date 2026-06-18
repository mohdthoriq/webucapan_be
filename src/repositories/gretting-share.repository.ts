import { prisma } from 'config/prisma';
import { Prisma, type GreetingShare } from '@prisma/client';

export class GreetingShareRepository {
  async findAll(): Promise<GreetingShare[]> {
    return prisma.greetingShare.findMany({
      orderBy: { shared_at: 'desc' }
    });
  }

  async findById(id: string): Promise<GreetingShare | null> {
    return prisma.greetingShare.findUnique({
      where: { id },
    });
  }

  async findByGreetingId(greeting_id: string): Promise<GreetingShare[]> {
    return prisma.greetingShare.findMany({
      where: { greeting_id },
      orderBy: { shared_at: 'desc' }
    });
  }

  async create(data: Prisma.GreetingShareUncheckedCreateInput): Promise<GreetingShare> {
    return prisma.greetingShare.create({
      data,
    });
  }

  async update(id: string, data: Prisma.GreetingShareUncheckedUpdateInput): Promise<GreetingShare> {
    return prisma.greetingShare.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<GreetingShare> {
    return prisma.greetingShare.delete({
      where: { id },
    });
  }
}
