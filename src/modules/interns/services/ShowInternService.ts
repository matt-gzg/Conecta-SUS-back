import AppError from "@shared/errors/AppError";
import Intern from "../typeorm/entities/Intern";
import { InternsRepository } from "../typeorm/repositories/InternsRepository";

interface IRequest {
    id: string;
}

export default class ShowInternService {
    public async execute({ id }: IRequest): Promise<Intern> {
        const intern = await InternsRepository.findById(id);
        if (!intern) {
            throw new AppError('Intern not found.');
        }
        return intern;
    }
}