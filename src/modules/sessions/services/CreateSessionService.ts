import Admin from "../../admins/typeorm/entities/Admin";
import AppError from "@shared/errors/AppError";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import auth from "@config/auth";
import { AdminsRepository } from "../../admins/typeorm/repositories/AdminsRepository";
import Secretary from "@modules/secretarys/typeorm/entities/Secretary";
import { SecretarysRepository } from "@modules/secretarys/typeorm/repositories/SecretarysRepository";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: Admin | Secretary;
    token: string;
}

export default class CreateSessionService {
    public async execute({ email, password }: IRequest): Promise<IResponse> {
        const admin = await AdminsRepository.findByEmail(email);
        let user, role;
        if (!admin) {
            const secretary = await SecretarysRepository.findByEmail(email);
            if (!secretary) {
                throw new AppError('Incorrect email/password combination.');
            }
            user = secretary;
            role = 'secretary';
        }
        else {
            user = admin;
            role = 'admin';
        }

        const passwordConfirmed = await compare(password, user.password);
        if (!passwordConfirmed) {
            throw new AppError('Incorrect email/password combination.');
        }
        const token = sign({ role: role }, auth.jwt.secret, {
            subject: user.id,
            expiresIn: '6h'
        })
        return { user, token };
    }
}