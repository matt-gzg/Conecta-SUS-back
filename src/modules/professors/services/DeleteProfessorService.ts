import AppError from "@shared/errors/AppError";
import { ProfessorsRepository } from "../typeorm/repositories/ProfessorsRepository";

interface IRequest {
    id: string;
}

export default class DeleteProfessorService {
    public async execute({ id }: IRequest): Promise<void> {
        const professor = await ProfessorsRepository.findById(id);
        if (!professor) {
            throw new AppError('Professor not found.');
        }
        await ProfessorsRepository.remove(professor);
    }
}