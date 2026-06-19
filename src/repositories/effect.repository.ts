import type { Prisma, Effect } from '@prisma/client';
import { prisma } from '../config/prisma';

export class EffectRepository {
  async findAll(): Promise<Effect[]> {
    return prisma.effect.findMany();
  }

  async findById(id: string): Promise<Effect | null> {
    return prisma.effect.findUnique({
      where: { id },
    });
  }

  async findByCode(code: string): Promise<Effect | null> {
    return prisma.effect.findUnique({
      where: { code },
    });
  }

  async create(data: Prisma.EffectCreateInput): Promise<Effect> {
    return prisma.effect.create({
      data,
    });
  }

  async update(id: string, data: Prisma.EffectUpdateInput): Promise<Effect> {
    return prisma.effect.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Effect> {
    return prisma.effect.delete({
      where: { id },
    });
  }
}
