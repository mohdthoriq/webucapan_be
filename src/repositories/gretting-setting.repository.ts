import { prisma } from '../config/prisma';
import { Prisma, type GreetingSetting } from '@prisma/client';

export class GreetingSettingRepository {
  async findByGreetingId(greeting_id: string): Promise<GreetingSetting | null> {
    return prisma.greetingSetting.findUnique({
      where: { greeting_id },
    });
  }

  // Menggunakan Upsert: Membuat data jika belum ada, atau update jika sudah ada
  async upsert(
    greeting_id: string,
    data: Omit<Prisma.GreetingSettingUncheckedCreateInput, 'greeting_id'>
  ): Promise<GreetingSetting> {
    return prisma.greetingSetting.upsert({
      where: { greeting_id },
      update: data,
      create: {
        greeting_id,
        ...data,
      },
    });
  }

  async delete(greeting_id: string): Promise<GreetingSetting> {
    return prisma.greetingSetting.delete({
      where: { greeting_id },
    });
  }
}
