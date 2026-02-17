import AppError from "@shared/errors/AppError";
import Professor from "../typeorm/entities/Professor";
import { ProfessorsRepository } from "../typeorm/repositories/ProfessorsRepository";

interface IRequest {
    intern_id: string;
}

export default class ListProfessorByInternService {
    public async execute({ intern_id }: IRequest): Promise<Professor> {
        const professor = await ProfessorsRepository.findById(intern_id);
        if (!professor) {
            throw new AppError('Professor not found.');
        }
        return professor;
    }
}