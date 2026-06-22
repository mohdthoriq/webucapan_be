import type { Request, Response } from 'express';
import { FileService } from '../services/file.service';
import { successResponse } from '../utils/response';

const fileService = new FileService();

// Helper untuk menghindari error "Do not know how to serialize a BigInt"
const serializeData = (data: any) => {
  return JSON.parse(
    JSON.stringify(data, (_key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    )
  );
};

export class FileController {
  async getAll(_req: Request, res: Response) {
    const files = await fileService.getAllFiles();
    successResponse(res, "Get all files successfully", serializeData(files), null, 200);
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;
    const file = await fileService.getFileById(id as string);
    successResponse(res, "Get file by id successfully", serializeData(file), null, 200);
  }

  async create(req: Request, res: Response) {
    const payload = {
      ...req.body,
      file_size: req.body.file_size ? BigInt(req.body.file_size) : null,
    };
      
    const newFile = await fileService.createFile(payload);
    successResponse(res, "Create file successfully", serializeData(newFile), null, 201);
  }

  async update(req: Request, res: Response) {
    const payload = {
      ...req.body,
      ...(req.body.file_size && { file_size: BigInt(req.body.file_size) }),
    };
    const updatedFile = await fileService.updateFile(req.params.id as string, payload);
    successResponse(res, "Update file successfully", serializeData(updatedFile), null, 200);
  }

  async delete(req: Request, res: Response) {
    await fileService.deleteFile(req.params.id as string);
    successResponse(res, "Delete file successfully", null, null, 200);
  }

  async uploadMultipleImages(req: Request, res: Response) {
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      throw new Error("Tidak ada file gambar yang diunggah");
    }

    const filesData = req.files as Express.Multer.File[];

    const uploadPromises = filesData.map(async (file: Express.Multer.File) => {
      const payload = {
        file_name: file.originalname,
        file_url: file.path,
        file_type: "image",
        mime_type: file.mimetype,
        file_size: file.size ? BigInt(file.size) : null,
        storage_path: file.filename,
      };

      return fileService.createFile(payload);
    });

    const createdFiles = await Promise.all(uploadPromises);

    successResponse(res, "Upload foto-foto berhasil", serializeData(createdFiles), null, 201);
  }

  async uploadSingleMusic(req: Request, res: Response) {
    if (!req.file) {
      throw new Error("Tidak ada file musik yang diunggah");
    }

    const file = req.file;
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/music/${file.filename}`;

    const payload = {
      file_name: file.originalname,
      file_url: fileUrl,
      file_type: "audio",
      mime_type: file.mimetype,
      file_size: file.size ? BigInt(file.size) : null,
      storage_path: `public/uploads/music/${file.filename}`,
    };

    const newFile = await fileService.createFile(payload);
    successResponse(res, "Upload musik berhasil", serializeData(newFile), null, 201);
  }
}
