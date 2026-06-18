import { prisma } from 'config/prisma';
import { Prisma, type GreetingView } from '@prisma/client';

export class GreetingViewRepository {
  async findAll(): Promise<GreetingView[]> {
    return prisma.greetingView.findMany({
      orderBy: { viewed_at: 'desc' }
    });
  }

  async findById(id: string): Promise<GreetingView | null> {
    return prisma.greetingView.findUnique({
      where: { id },
    });
  }

  async findByGreetingId(greeting_id: string): Promise<GreetingView[]> {
    return prisma.greetingView.findMany({
      where: { greeting_id },
      orderBy: { viewed_at: 'desc' }
    });
  }

  async create(data: Prisma.GreetingViewUncheckedCreateInput): Promise<GreetingView> {
    return prisma.greetingView.create({
      data,
    });
  }

  async update(id: string, data: Prisma.GreetingViewUncheckedUpdateInput): Promise<GreetingView> {
    return prisma.greetingView.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<GreetingView> {
    return prisma.greetingView.delete({
      where: { id },
    });
  }
}