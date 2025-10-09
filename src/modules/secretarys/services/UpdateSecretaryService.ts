import { compare, hash } from "bcryptjs";
import Secretary from "../typeorm/entities/Secretary";
import { SecretarysRepository } from "../typeorm/repositories/SecretarysRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
    id: string;
    name: string;
    email: string;
    password?: string;
    old_password?: string;
}

export default class CreateSecretaryService {
    public async execute({ id, name, email, password, old_password }: IRequest): Promise<Secretary> {
        const secretary = await SecretarysRepository.findById(id);
        if(!secretary){
            throw new AppError('Secretary not found.');
        }
        const secretaryUpdateEmail = await SecretarysRepository.findByEmail(email);
        if (secretaryUpdateEmail && secretaryUpdateEmail.id != secretary.id) {
            throw new AppError('There is alredy one secretary with this email.');
        }
        if(password && !old_password){
            throw new AppError('Old password is required.');
        }
        if(password && old_password){
            const checkOldPassword = await compare(old_password, secretary.password);
            if(!checkOldPassword){
                throw new AppError('Old password does not match.');
            }
            secretary.password = await hash(password, 8);
        }
        secretary.name = name;
        secretary.email = email;
        await SecretarysRepository.save(secretary);
        return secretary;
    }
}