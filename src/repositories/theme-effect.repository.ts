import { prisma } from 'config/prisma';
import { Prisma, type ThemeEffect } from '@prisma/client';

export class ThemeEffectRepository {
  // Mengambil semua efek yang dimiliki oleh satu tema tertentu
  async findByThemeId(theme_id: string): Promise<ThemeEffect[]> {
    return prisma.themeEffect.findMany({
      where: { theme_id },
      include: {
        effect: true, // Sertakan detail efeknya
      },
    });
  }

  // Mengambil semua tema yang menggunakan satu efek tertentu
  async findByEffectId(effect_id: string): Promise<ThemeEffect[]> {
    return prisma.themeEffect.findMany({
      where: { effect_id },
      include: {
        theme: true, // Sertakan detail temanya
      },
    });
  }

  // Menambahkan relasi (Assign effect to theme)
  async create(data: Prisma.ThemeEffectUncheckedCreateInput): Promise<ThemeEffect> {
    return prisma.themeEffect.create({
      data,
    });
  }

  // Menghapus relasi menggunakan Composite Key
  async delete(theme_id: string, effect_id: string): Promise<ThemeEffect> {
    return prisma.themeEffect.delete({
      where: {
        theme_id_effect_id: {
          theme_id,
          effect_id,
        },
      },
    });
  }
}
