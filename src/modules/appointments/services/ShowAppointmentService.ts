import AppError from "@shared/errors/AppError";
import { AppointmentsRepository } from "../typeorm/repositories/AppointmentsRepository";
import Appointment from "../typeorm/entities/Appointment";

interface IRequest {
    id: string;
}

export default class ShowAppointmentService {
    public async execute({ id }: IRequest): Promise<Appointment> {
        const appointment = await AppointmentsRepository.findById(id);
        if (!appointment) {
            throw new AppError('Appointment not found.');
        }
        return appointment;
    }
}