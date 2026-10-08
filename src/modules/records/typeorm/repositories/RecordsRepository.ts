import { AppDataSource } from "@shared/typeorm/data-source";
import Record from "../entities/Record";

export const RecordsRepository = AppDataSource.getRepository(Record).extend({
    
    async findAll(): Promise<Record[]> {
        const records = await this.find({
            select: {
                id: true,
                anamnesis: true,
                physicalExam: true,
                solicitedTests: true,
                instructions: true,
                prescription: true,
                conduct: true,
                cid10: true,
                aproved: true,
                document: true,
                created_at: true,
                updated_at: true,
                intern: {
                    id: true,
                    name: true,
                },
                patient: {
                    id: true,
                    name: true,
                },
                appointment: {
                    id: true,
                    date_time: true,
                    status: true,
                },
            },
            relations: {
                appointment: true,
                intern: true,
                patient: true,
                appointment.professor: true                                                            
            },
        });
    },

    async findById(id: string): Promise<Record | null> {
        const record = this.findOne({
            where: { id }, select: {
                id: true,
                anamnesis: true,
                physicalExam: true,
                solicitedTests: true,
                instructions: true,
                prescription: true,
                conduct: true,
                cid10: true,
                aproved: true,
                document: true,
                created_at: true,
                updated_at: true,
                intern: {
                    id: true,
                    name: true,
                },
                patient: {
                    id: true,
                    name: true,
                },
                appointment: {
                    id: true,
                    date_time: true,
                    status: true,
                },
            },
            relations: {
                intern: true,
                patient: true,
                appointment: true,
                appointment.professor: true                                                            
            }
        });
    },

    async findByIntern(intern_id: string): Promise<Record[]> {
        const record = this.find({
            where: { intern: { id: intern_id } }, select: {
                id: true,
                anamnesis: true,
                physicalExam: true,
                solicitedTests: true,
                instructions: true,
                prescription: true,
                conduct: true,
                cid10: true,
                aproved: true,
                document: true,
                created_at: true,
                updated_at: true,
                intern: {
                    id: true,
                    name: true,
                },
                patient: {
                    id: true,
                    name: true,
                },
                appointment: {
                    id: true,
                    date_time: true,
                    status: true,
                },
            }, relations: { intern: true, patient: true, appointment: true, appointment.professor: true }
        });
    },

    async findByPatient(patient_id: string): Promise<Record[]> {
        const record = this.find({
            where: { patient: { id: patient_id } }, select: {
                id: true,
                aproved: true,
                created_at: true,
                updated_at: true,
                intern: {
                    id: true,
                    name: true,
                },
                patient: {
                    id: true,
                    name: true,
                },
                appointment: {
                    id: true,
                    date_time: true,
                    status: true,
                },
            }, relations: { intern: true, patient: true, appointment: true, appointment.professor: true }
        });
    },

    async findByAppointment(appointment_id: string): Promise<Record | null> {
        const record = this.findOne({
            where: { appointment: { id: appointment_id } }, select: {
                id: true,
                created_at: true,
                updated_at: true,
                intern: {
                    id: true,
                    name: true,
                },
                patient: {
                    id: true,
                    name: true,
                },
                appointment: {
                    id: true,
                    date_time: true,
                    status: true,
                },
            }, relations: { intern: true, patient: true, appointment: true, appointment.professor: true }
        });
    }
});