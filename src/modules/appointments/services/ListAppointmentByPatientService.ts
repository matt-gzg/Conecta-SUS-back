import Appointment from "../typeorm/entities/Appointment";
import { AppointmentsRepository } from "../typeorm/repositories/AppointmentsRepository";

interface IRequest {
    id: string;
}

export default class ListAppointmentByPatientService {
    public async execute({ id }: IRequest): Promise<Appointment[]> {
        const appointments = await AppointmentsRepository.findByPatient(id);
        return appointments;
    }
}