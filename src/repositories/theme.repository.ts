import { prisma } from 'config/prisma';
import { Prisma, type Theme } from '@prisma/client';

export class ThemeRepository {
  async findAll(activeOnly?: boolean): Promise<Theme[]> {
    const where: Prisma.ThemeWhereInput = {};
    if (activeOnly !== undefined) {
      where.is_active = activeOnly;
    }

    return prisma.theme.findMany({
      where,
      include: {
        theme_effects: true, // Mengikutsertakan relasi efek tema jika diperlukan
      },
      orderBy: { created_at: 'desc' },
    });
  }

  async findById(id: string): Promise<Theme | null> {
    return prisma.theme.findUnique({
      where: { id },
      include: {
        theme_effects: true,
      },
    });
  }

  async create(data: Prisma.ThemeCreateInput): Promise<Theme> {
    return prisma.theme.create({
      data,
    });
  }

  async update(id: string, data: Prisma.ThemeUpdateInput): Promise<Theme> {
    return prisma.theme.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Theme> {
    return prisma.theme.delete({
      where: { id },
    });
  }
}
