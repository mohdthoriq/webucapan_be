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
}
