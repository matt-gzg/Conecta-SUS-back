import { compare, hash } from "bcryptjs";
import Patient from "../typeorm/entities/Patient";
import { PatientsRepository } from "../typeorm/repositories/PatientsRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
    id: string;
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
    public async execute({ id, name, cpf, susnumber, email, birth_date, phone, gender, cep, city, street, district, number, complement }: IRequest): Promise<Patient> {
        const patient = await PatientsRepository.findById(id);
        if (!patient) {
            throw new AppError('Patient not found.');
        }
        const patientUpdateEmail = await PatientsRepository.findByEmail(email);
        if (patientUpdateEmail && patientUpdateEmail.id != patient.id) {
            throw new AppError('There is alredy one patient with this email.');
        }
        const patientUpdateCPF = await PatientsRepository.findByCPF(cpf);
        if (patientUpdateCPF && patientUpdateCPF.id != patient.id) {
            throw new AppError('There is alredy one patient with this CPF.');
        }
        const patientUpdateSUSNumber = await PatientsRepository.findBySUSNumber(susnumber);
        if (patientUpdateSUSNumber && patientUpdateSUSNumber.id != patient.id) {
            throw new AppError('There is alredy one patient with this SUS number.');
        }
        patient.name = name;
        patient.cpf = cpf;
        patient.susnumber = susnumber;
        patient.email = email;
        patient.birth_date = birth_date;
        patient.phone = phone;
        patient.gender = gender;
        patient.cep = cep;
        patient.city = city;
        patient.street = street;
        patient.district = district;
        patient.number = number;
        patient.complement = complement;

        await PatientsRepository.save(patient);
        return patient;
    }
}