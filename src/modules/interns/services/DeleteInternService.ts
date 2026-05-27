import AppError from "@shared/errors/AppError";
import { InternsRepository } from "../typeorm/repositories/InternsRepository";

interface IRequest {
    id: string;
}

export default class DeleteInternService {
    public async execute({ id }: IRequest): Promise<void> {
        const intern = await InternsRepository.findById(id);
        if (!intern) {
            throw new AppError('Intern not found.');
        }
        await InternsRepository.remove(intern);
    }
}