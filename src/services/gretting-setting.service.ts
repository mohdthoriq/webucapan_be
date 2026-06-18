import { GreetingSettingRepository } from 'repositories/gretting-setting.repository';
import { Prisma } from '@prisma/client';

export class GreetingSettingService {
  private repository: GreetingSettingRepository;

  constructor() {
    this.repository = new GreetingSettingRepository();
  }

  async getSettingByGreetingId(greeting_id: string) {
    const setting = await this.repository.findByGreetingId(greeting_id);
    if (!setting) throw new Error('Pengaturan untuk kartu ucapan ini tidak ditemukan');
    return setting;
  }

  async upsertSetting(
    greeting_id: string, 
    data: Omit<Prisma.GreetingSettingUncheckedCreateInput, 'greeting_id'>
  ) {
    if (!greeting_id) throw new Error('Greeting ID wajib disertakan');
    return this.repository.upsert(greeting_id, data);
  }

  async deleteSetting(greeting_id: string) {
    // Validasi eksistensi data sebelum dihapus
    await this.getSettingByGreetingId(greeting_id);
    return this.repository.delete(greeting_id);
  }
}
