
import Appointment from "../typeorm/entities/Appointment";
import { AppointmentsRepository } from "../typeorm/repositories/AppointmentsRepository";

interface IRequest {
    id: string;
}

export default class ListAppointmentByInternService {
    public async execute({ id }: IRequest): Promise<null | Appointment[]> {
        const appointments = await AppointmentsRepository.findByIntern(id);
        return appointments;
    }
}