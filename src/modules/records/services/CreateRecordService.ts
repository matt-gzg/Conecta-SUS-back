import AppError from "@shared/errors/AppError";
import Record from "../typeorm/entities/Record";
import { InternsRepository } from "@modules/interns/typeorm/repositories/InternsRepository";
import { PatientsRepository } from "@modules/patients/typeorm/repositories/PatientsRepository";
import { RecordsRepository } from "../typeorm/repositories/RecordsRepository";
import { AppointmentsRepository } from "@modules/appointments/typeorm/repositories/AppointmentsRepository";

interface IRequest {
    anamnesis: string;
    physicalExam: string;
    solicitedTests: string;
    instructions: string;
    prescription: string;
    conduct: string;
    cid10: string;
    intern_id: string;
    patient_id: string;
    appointment_id: string;
}

export default class CreateRecordService {
    public async execute({ anamnesis, physicalExam, solicitedTests, instructions, prescription, conduct, cid10, intern_id, patient_id, appointment_id }: IRequest): Promise<Record> {
        const intern = await InternsRepository.findById(intern_id);
        if (!intern) {
            throw new AppError('Intern not found');
        }
        const patient = await PatientsRepository.findById(patient_id);
        if (!patient) {
            throw new AppError('Patient not found');
        }
        const appointment = await AppointmentsRepository.findById(appointment_id);
        if (!appointment) {
            throw new AppError('Appointment not found');
        }
        const recordExists = await RecordsRepository.findByAppointment(appointment_id);
        if (recordExists) {
            throw new AppError('Record already exists for this appointment');
        }

        const record = RecordsRepository.create({anamnesis, physicalExam, solicitedTests, instructions, prescription, conduct, cid10, intern, patient, appointment });
        await RecordsRepository.save(record);
        return record;
    }
}