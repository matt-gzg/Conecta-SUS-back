import { AppointmentsRepository } from "../typeorm/repositories/AppointmentsRepository";
import Appointment from "../typeorm/entities/Appointment";

export default class ListAppointmentService {
    public async execute(): Promise<Appointment[]> {
        const appointments = await AppointmentsRepository.findAll();
        return appointments;
    }
}