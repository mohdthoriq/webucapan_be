import type { Request, Response } from 'express';
import { EffectService } from '../services/effect.service';
import { successResponse } from '../utils/response';

const effectService = new EffectService();

export class EffectController {
  async getAll(req: Request, res: Response) {
    const effects = await effectService.getAllEffects();
    successResponse(res, "Get all effects successfully", effects, null, 200)
  }

  async getById(req: Request, res: Response) {
    const id = req.params.id as string;
    const effect = await effectService.getEffectById(id);
    successResponse(res, "Get effect by id successfully", effect, null, 200)
  }

  async create(req: Request, res: Response) {
    const { name, code } = req.body;
    const newEffect = await effectService.createEffect({ name, code });
    successResponse(res, "Create effect successfully", newEffect, null, 201)
  }

  async update(req: Request, res: Response) {
    const id = req.params.id as string;
    const { name, code } = req.body;
    const updatedEffect = await effectService.updateEffect(id, { name, code });
    successResponse(res, "Update effect successfully", updatedEffect, null, 200);
  }

  async delete(req: Request, res: Response) {
    const id = req.params.id as string;
    await effectService.deleteEffect(id);
    successResponse(res, "Delete effect successfully", null, null, 200);
  }
}
