import AppError from "@shared/errors/AppError";
import { AppointmentsRepository } from "../typeorm/repositories/AppointmentsRepository";

interface IRequest {
    id: string;
}

export default class DeleteAppointmentService {
    public async execute({ id }: IRequest): Promise<void> {
        const appointment = await AppointmentsRepository.findById(id);
        if (!appointment) {
            throw new AppError('Appointment not found.');
        }
        await AppointmentsRepository.remove(appointment);
    }
}