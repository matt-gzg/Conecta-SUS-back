import AppError from "@shared/errors/AppError";
import Patient from "../typeorm/entities/Patient";
import { PatientsRepository } from "../typeorm/repositories/PatientsRepository";

interface IRequest {
    name: string;
}

export default class ListPatientsByNameService {
    public async execute({ name }: IRequest): Promise<Patient> {
        const patient = await PatientsRepository.findByName(name);
        if (!patient) {
            throw new AppError('Patient not found.');
        }
        return patient;
    }
}