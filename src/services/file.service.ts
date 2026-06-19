import { FileRepository } from '../repositories/file.repository';
import { Prisma } from '@prisma/client';

export class FileService {
  private fileRepository: FileRepository;

  constructor() {
    this.fileRepository = new FileRepository();
  }

  async getAllFiles() {
    return this.fileRepository.findAll();
  }

  async getFileById(id: string) {
    const file = await this.fileRepository.findById(id);
    if (!file) throw new Error('File tidak ditemukan');
    return file;
  }

  async createFile(data: Prisma.FileCreateInput) {
    // Jika ada logika tambahan sebelum insert (misal: validasi ukuran file), taruh di sini
    return this.fileRepository.create(data);
  }

  async updateFile(id: string, data: Prisma.FileUpdateInput) {
    // Pastikan file ada sebelum diupdate
    await this.getFileById(id);
    return this.fileRepository.update(id, data);
  }

  async deleteFile(id: string) {
    // Pastikan file ada sebelum dihapus
    await this.getFileById(id);
    // Di aplikasi nyata, kamu juga bisa menambahkan logika untuk 
    // menghapus file fisik dari storage (AWS S3, Cloudinary, atau Local) di sini
    return this.fileRepository.delete(id);
  }
}
