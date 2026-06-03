import { AppDataSource } from "@shared/typeorm/data-source";
import Record from "../entities/Record";

export const RecordsRepository = AppDataSource.getRepository(Record).extend({
    
    async findAll(): Promise<Record[]> {
        return this.find({
            relations: ['appointment', 'appointment.professor', 'intern', 'patient']
        });
    },

    async findById(id: string): Promise<Record | null> {
        return this.findOne({
            where: { id },
            relations: ['appointment', 'appointment.professor', 'intern', 'patient']
        });
    },

    async findByIntern(intern_id: string): Promise<Record[]> {
        return this.find({
            where: { intern: { id: intern_id } },
            relations: ['appointment', 'appointment.professor', 'intern', 'patient']
        });
    },

    async findByPatient(patient_id: string): Promise<Record[]> {
        return this.find({
            where: { patient: { id: patient_id } },
            relations: ['appointment', 'appointment.professor', 'intern', 'patient']
        });
    },

    async findByAppointment(appointment_id: string): Promise<Record | null> {
        return this.findOne({
            where: { appointment: { id: appointment_id } },
            relations: ['appointment', 'appointment.professor', 'intern', 'patient']
        });
    }
});