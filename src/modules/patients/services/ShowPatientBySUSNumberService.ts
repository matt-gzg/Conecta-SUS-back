import AppError from "@shared/errors/AppError";
import Patient from "../typeorm/entities/Patient";
import { PatientsRepository } from "../typeorm/repositories/PatientsRepository";

interface IRequest {
    susnumber: string;
}

export default class ShowPatientBySUSNumberService {
    public async execute({ susnumber }: IRequest): Promise<Patient> {
        const patient = await PatientsRepository.findBySUSNumber(susnumber);
        if (!patient) {
            throw new AppError('Patient not found.');
        }
        return patient;
    }
}