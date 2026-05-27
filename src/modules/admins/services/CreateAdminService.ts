import { hash } from "bcryptjs";
import Admin from "../typeorm/entities/Admin";
import { AdminsRepository } from "../typeorm/repositories/AdminsRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
    name: string;
    email: string;
    password: string;
}

export default class CreateAdminService {
    public async execute({ name, email, password }: IRequest): Promise<Admin> {
        const emailExists = await AdminsRepository.findByEmail(email);
        if (emailExists) {
            throw new AppError('Email address already used.');
        }
        const hashedPassword = await hash(password, 8);
        const admin = AdminsRepository.create({
            name,
            email,
            password: hashedPassword
        });
        await AdminsRepository.save(admin);
        return admin;
    }
}