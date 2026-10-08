import { AppDataSource } from "@shared/typeorm/data-source"
import Patient from "../entities/Patient"

export const PatientsRepository = AppDataSource.getRepository(Patient).extend({
    async find(): Promise<Patient[]> {
        return AppDataSource.getRepository(Patient).find({
            select: {
                id: true,
                name: true,
                cpf: true,
                susnumber: true,
                email: true,
                birth_date: true,
                phone: true,
                gender: true,
                cep: true,
                city: true,
                street: true,
                district: true,
                number: true,
                complement: true,
            },
        });
    },

    async findByName(name : string) : Promise<Patient | null> {
        const patient = await this.findOne({
            where: { name },
            select: {
                id: true, name: true, cpf: true, susnumber: true, email: true,
                birth_date: true, phone: true, gender: true, cep: true, city: true,
                street: true, district: true, number: true, complement: true,
            },
        });
        return patient;  
    },

    async findById(id : string): Promise<Patient | null>{
        const patient = await this.findOne({
            where: { id },
            select: {
                id: true, name: true, cpf: true, susnumber: true, email: true,
                birth_date: true, phone: true, gender: true, cep: true, city: true,
                street: true, district: true, number: true, complement: true,
            },
        });
        return patient;
    },

    async findByEmail(email : string): Promise<Patient | null>{
        const patient = await this.findOne({
            where: { email },
            select: { id: true, name: true, email: true },
        });
        return patient;
    },

    async findBySUSNumber(susnumber : string): Promise<Patient | null>{
        const patient = await this.findOne({
            where: { susnumber },
            select: { id: true, name: true, susnumber: true },
        });
        return patient;
    },

    async findByCPF(cpf : string): Promise<Patient | null>{
        const patient = await this.findOne({
            where: { cpf },
            select: { id: true, name: true, cpf: true },
        });
        return patient;
    }
})