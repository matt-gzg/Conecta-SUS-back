import Patient from "../typeorm/entities/Patient";
import { PatientsRepository } from "../typeorm/repositories/PatientsRepository";

export default class ListPatientService {
    public async execute(): Promise<Patient[]> {
        const patients = await PatientsRepository.find();
        return patients;
    }
}