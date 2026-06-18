import { prisma } from '../config/prisma';
import type { Prisma, File } from '@prisma/client';

export class FileRepository {
  async findAll(): Promise<File[]> {
    return prisma.file.findMany();
  }

  async findById(id: string): Promise<File | null> {
    return prisma.file.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.FileCreateInput): Promise<File> {
    return prisma.file.create({
      data,
    });
  }

  async update(id: string, data: Prisma.FileUpdateInput): Promise<File> {
    return prisma.file.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<File> {
    return prisma.file.delete({
      where: { id },
    });
  }
}
