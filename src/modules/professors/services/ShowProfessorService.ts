import AppError from "@shared/errors/AppError";
import Professor from "../typeorm/entities/Professor";
import { ProfessorsRepository } from "../typeorm/repositories/ProfessorsRepository";

interface IRequest {
    id: string;
}

export default class ShowProfessorService {
    public async execute({ id }: IRequest): Promise<Professor> {
        const professor = await ProfessorsRepository.findById(id);
        if (!professor) {
            throw new AppError('Professor not found.');
        }
        return professor;
    }
}