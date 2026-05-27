import AppError from "@shared/errors/AppError";
import { NextFunction, Request, Response } from "express";
import { AppointmentsRepository } from "@modules/appointments/typeorm/repositories/AppointmentsRepository";

export default async function ensureCanAccessAppointment(request: Request, response: Response, next: NextFunction): Promise<void> {
    const { user } = request;

    if (!user) {
        throw new AppError("Unauthorized", 401);
    }

    if (user.role !== "intern") {
        return next();
    }

    const { id } = request.params;

    if (!id) {
        throw new AppError("Appointment id not provided", 400);
    }

    const appointment = await AppointmentsRepository.findById(id);

    if (!appointment) {
        throw new AppError("Appointment not found", 404);
    }

    if (!appointment.intern || appointment.intern.id !== user.id) {
        throw new AppError("Insufficient permissions", 403);
    }

    return next();
}
