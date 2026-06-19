import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import {env} from '../utils/env';
import { errorResponse } from '../utils/response';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        const err: any = new Error("Token tidak ditemukan");
        err.statusCode = 401;
        throw err;
    }

    const token = authHeader?.split(' ')[1];

    try {
        const payload = jwt.verify(token!, env.JWT_SECRET!) as { id: string, role: string, institutionId: string, institutionName: string }

        req.user = payload

        next();
    } catch (error) {
        errorResponse(res, "Token tidak valid", 401);
    }
}