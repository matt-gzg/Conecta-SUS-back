import Admin from "../typeorm/entities/Admin";
import AppError from "@shared/errors/AppError";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import auth from "@config/auth";
import { AdminsRepository } from "../typeorm/repositories/AdminsRepository";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    admin: Admin;
    token: string;
}

export default class CreateSessionService {
    public async execute({ email, password }: IRequest): Promise<IResponse> {
        const admin = await AdminsRepository.findByEmail(email);
        if (!admin) {
            throw new AppError('Incorrect email/password combination.');
        }
        const passwordConfirmed = await compare(password, admin.password);
        if (!passwordConfirmed) {
            throw new AppError('Incorrect email/password combination.');
        }
        const token = sign({ role: admin.role }, auth.jwt.secret, {
            subject: admin.id,
            expiresIn: '6h'
        })
        return { admin, token };
    }
}