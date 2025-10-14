import Patient from "../typeorm/entities/Patient";
import { PatientsRepository } from "../typeorm/repositories/PatientsRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
    name: string;
    cpf: string;
    susnumber: string;
    email: string;
    birth_date: Date;
    phone: string;
    gender: string;
    cep: string;
    city: string;
    street: string;
    district: string;
    number: string;
    complement: string;
}

export default class CreatePatientService {
    public async execute({ name, cpf, susnumber, email, birth_date, phone, gender, cep, city, street, district, number, complement }: IRequest): Promise<Patient> {
        if (!email) {
            const emailExists = await PatientsRepository.findByEmail(email);
            if (emailExists) {
                throw new AppError('Email address already used.');
            }
        }
        const cpfExists = await PatientsRepository.findByCPF(cpf)
        if (cpfExists) {
            throw new AppError('Theres alredy one patient with this CPF.');
        }
        const susnumberExists = await PatientsRepository.findBySUSNumber(susnumber)
        if (susnumberExists) {
            throw new AppError('Theres alredy one patient with this SUS number.');
        }
        const patient = PatientsRepository.create({
            name, cpf, susnumber, email, birth_date, phone, gender, cep, city, street, district, number, complement
        });
        await PatientsRepository.save(patient);
        return patient;
    }
}