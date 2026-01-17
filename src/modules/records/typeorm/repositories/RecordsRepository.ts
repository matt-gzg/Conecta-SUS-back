import { Between } from "typeorm";
import { AppDataSource } from "@shared/typeorm/data-source";
import Record from "../entities/Record";

export const RecordsRepository = AppDataSource.getRepository(Record).extend({
    async findById(id: string): Promise<Record | null> {
        const record = this.findOne({ where: { id }, relations: { intern: true, patient: true, appointment: true } });
        return record;
    },

    async findByIntern(intern_id: string): Promise<Record[]> {
        const record = this.find({ where: { intern: { id: intern_id } }, relations: { intern: true, patient: true, appointment: true } });
        return record;
    },

    async findByPatient(patient_id: string): Promise<Record[]> {
        const record = this.find({ where: { patient: { id: patient_id } }, relations: { intern: true, patient: true, appointment: true } });
        return record;
    },

    async findByAppointment(appointment_id: string): Promise<Record | null> {
        const record = this.findOne({ where: { appointment: { id: appointment_id } }, relations: { intern: true, patient: true, appointment: true } });
        return record;
    }
})