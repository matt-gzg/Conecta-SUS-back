import AppError from "@shared/errors/AppError";
import Patient from "../typeorm/entities/Patient";
import { PatientsRepository } from "../typeorm/repositories/PatientsRepository";

interface IRequest {
    id: string;
}

export default class ShowPatientService {
    public async execute({ id }: IRequest): Promise<Patient> {
        const patient = await PatientsRepository.findById(id);
        if (!patient) {
            throw new AppError('Patient not found.');
        }
        return patient;
    }
}