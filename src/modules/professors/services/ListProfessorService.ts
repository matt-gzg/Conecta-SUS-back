import Professor from "../typeorm/entities/Professor";
import { ProfessorsRepository } from "../typeorm/repositories/ProfessorsRepository";

export default class ListProfessorService {
    public async execute(): Promise<Professor[]> {
        const professors = await ProfessorsRepository.find();
        return professors;
    }
}