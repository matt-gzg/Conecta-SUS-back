import AppError from "@shared/errors/AppError";
import Appointment from "../typeorm/entities/Appointment";
import { AppointmentsRepository } from "../typeorm/repositories/AppointmentsRepository";
import { InternsRepository } from "@modules/interns/typeorm/repositories/InternsRepository";
import { PatientsRepository } from "@modules/patients/typeorm/repositories/PatientsRepository";
import { ProfessorsRepository } from "@modules/professors/typeorm/repositories/ProfessorsRepository";

interface IRequest {
    date_time: Date;
    status: string;
    intern_id: string;
    patient_id: string;
    professor_id:string;
}

export default class CreateAppointmentService {
    public async execute({ date_time, status, intern_id, patient_id , professor_id}: IRequest): Promise<Appointment> {
        const intern = await InternsRepository.findById(intern_id);
        if (!intern) {
            throw new AppError('Intern not found');
        }
        const patient = await PatientsRepository.findById(patient_id);
        if (!patient) {
            throw new AppError('Patient not found');
        }
        const professor = await ProfessorsRepository.findById(professor_id);
        if (!professor) {
            throw new AppError('Professor not found');
        }

        const appointment = AppointmentsRepository.create({ date_time, status, intern, patient, professor });
        await AppointmentsRepository.save(appointment);
        return appointment;
    }
}