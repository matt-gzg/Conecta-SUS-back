import { hash } from "bcryptjs";
import Secretary from "../typeorm/entities/Secretary";
import { SecretarysRepository } from "../typeorm/repositories/SecretarysRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
    name: string;
    email: string;
    password: string;
}

export default class CreateSecretaryService {
    public async execute({ name, email, password }: IRequest): Promise<Secretary> {
        const emailExists = await SecretarysRepository.findByEmail(email);
        if (emailExists) {
            throw new AppError('Email address already used.');
        }
        const hashedPassword = await hash(password, 8);
        const secretary = SecretarysRepository.create({
            name,
            email,
            password: hashedPassword
        });
        await SecretarysRepository.save(secretary);
        return secretary;
    }
}