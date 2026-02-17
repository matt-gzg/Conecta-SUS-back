import AppError from "@shared/errors/AppError";
import Intern from "../typeorm/entities/Intern";
import { InternsRepository } from "../typeorm/repositories/InternsRepository";

interface IRequest {
    professor: string;
}

export default class ListInternByProfessorService {
    public async execute({ professor }: IRequest): Promise<Intern[]> {
        const intern = await InternsRepository.findByProfessor(professor);
        if (!intern?.length) {
            throw new AppError('No interns found for this professor.');
        }
        return intern;
    }
}