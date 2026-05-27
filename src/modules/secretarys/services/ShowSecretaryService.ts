import AppError from "@shared/errors/AppError";
import Secretary from "../typeorm/entities/Secretary";
import { SecretarysRepository } from "../typeorm/repositories/SecretarysRepository";

interface IRequest {
    id: string;
}

export default class ShowSecretaryService {
    public async execute({ id }: IRequest): Promise<Secretary> {
        const secretary = await SecretarysRepository.findById(id);
        if (!secretary) {
            throw new AppError('Secretary not found.');
        }
        return secretary;
    }
}