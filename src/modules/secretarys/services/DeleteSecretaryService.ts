import AppError from "@shared/errors/AppError";
import { SecretarysRepository } from "../typeorm/repositories/SecretarysRepository";

interface IRequest {
    id: string;
}

export default class DeleteSecretaryService {
    public async execute({ id }: IRequest): Promise<void> {
        const secretary = await SecretarysRepository.findById(id);
        if (!secretary) {
            throw new AppError('Secretary not found.');
        }
        await SecretarysRepository.remove(secretary);
    }
}