
import Appointment from "../typeorm/entities/Appointment";
import { AppointmentsRepository } from "../typeorm/repositories/AppointmentsRepository";

interface IRequest {
    date: Date;
}

export default class ListAppointmentByDateService {
    public async execute({ date }: IRequest): Promise<Appointment[]> {
        const appointments = await AppointmentsRepository.findByDate(date);
        return appointments;
    }
}