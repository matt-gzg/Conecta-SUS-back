import AppError from "@shared/errors/AppError";
import Patient from "../typeorm/entities/Patient";
import { PatientsRepository } from "../typeorm/repositories/PatientsRepository";

interface IRequest {
    cpf: string;
}

export default class ShowPatientByCPFService {
    public async execute({ cpf }: IRequest): Promise<Patient> {
        const patient = await PatientsRepository.findByCPF(cpf);
        if (!patient) {
            throw new AppError('Patient not found.');
        }
        return patient;
    }
}