import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { RecordsRepository } from "@modules/records/typeorm/repositories/RecordsRepository";
import { InternsRepository } from "@modules/interns/typeorm/repositories/InternsRepository";

export default async function ensureCanAccessRecord(request: Request, response: Response, next: NextFunction): Promise<void> {
    const { user } = request;

    if (!user) {
        throw new AppError("Unauthorized", 401);
    }

    if (user.role === "admin") {
        return next();
    }

    const { id } = request.params;

    if (!id) {
        throw new AppError("Record id not provided", 400);
    }

    const record = await RecordsRepository.findById(id);

    if (!record) {
        throw new AppError("Record not found", 404);
    }

    if (!record.intern) {
        throw new AppError("Record without intern", 400);
    }

    if (user.role === "intern") {
        if (record.intern.id !== user.id) {
            throw new AppError("Insufficient permissions", 403);
        }

        return next();
    }

    if (user.role === "professor") {
        const intern = await InternsRepository.findById(record.intern.id);

        if (!intern || !intern.professor || intern.professor.id !== user.id) {
            throw new AppError("Insufficient permissions", 403);
        }

        return next();
    }

    throw new AppError("Insufficient permissions", 403);
}
