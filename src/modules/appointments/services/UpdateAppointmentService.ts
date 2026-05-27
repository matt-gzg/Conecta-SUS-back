import AppError from "@shared/errors/AppError";
import Appointment from "../typeorm/entities/Appointment";
import { AppointmentsRepository } from "../typeorm/repositories/AppointmentsRepository";
import { InternsRepository } from "@modules/interns/typeorm/repositories/InternsRepository";
import { PatientsRepository } from "@modules/patients/typeorm/repositories/PatientsRepository";

interface IRequest {
    id: string;
    date_time: Date;
    status: string;
    intern_id: string;
    patient_id: string;
}

export default class UpdateAppointmentService {
    public async execute({ id, date_time, status, intern_id, patient_id }: IRequest): Promise<Appointment> {
        const appointment = await AppointmentsRepository.findById(id);
        if (!appointment) {
            throw new AppError('Appointment not found');
        }
        const intern = await InternsRepository.findById(intern_id);
        if (!intern) {
            throw new AppError('Intern not found');
        }
        const patient = await PatientsRepository.findById(patient_id);
        if (!patient) {
            throw new AppError('Patient not found');
        }
        appointment.date_time = date_time;
        appointment.status = status;
        appointment.intern = intern;
        appointment.patient = patient;

        await AppointmentsRepository.save(appointment);
        return appointment;
    }
}