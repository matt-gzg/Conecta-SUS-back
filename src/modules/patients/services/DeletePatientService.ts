import AppError from "@shared/errors/AppError";
import { PatientsRepository } from "../typeorm/repositories/PatientsRepository";

interface IRequest {
    id: string;
}

export default class DeletePatientService {
    public async execute({ id }: IRequest): Promise<void> {
        const patient = await PatientsRepository.findById(id);
        if (!patient) {
            throw new AppError('Patient not found.');
        }
        await PatientsRepository.remove(patient);
    }
}