import Admin from "../../admins/typeorm/entities/Admin";
import AppError from "@shared/errors/AppError";
import { compare, hash } from "bcryptjs";
import { sign } from "jsonwebtoken";
import auth from "@config/auth";
import { AdminsRepository } from "../../admins/typeorm/repositories/AdminsRepository";
import Secretary from "@modules/secretarys/typeorm/entities/Secretary";
import { SecretarysRepository } from "@modules/secretarys/typeorm/repositories/SecretarysRepository";
import Professor from "@modules/professors/typeorm/entities/Professor";
import Intern from "@modules/interns/typeorm/entities/Intern";
import { ProfessorsRepository } from "@modules/professors/typeorm/repositories/ProfessorsRepository";
import { InternsRepository } from "@modules/interns/typeorm/repositories/InternsRepository";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: Admin | Secretary | Professor | Intern;
    token: string;
}

export default class CreateSessionService {
    public async execute({ email, password }: IRequest): Promise<IResponse> {
        let user = await AdminsRepository.findByEmail(email);
        let role = 'admin';

        if (!user) {
            user = await SecretarysRepository.findByEmail(email);
            role = 'secretary';
            if (!user) {
                user = await ProfessorsRepository.findByEmail(email);
                role = 'professor';
                if (!user) {
                    user = await InternsRepository.findByEmail(email);
                    role = 'intern';
                    if (!user) {
                        throw new AppError('Incorrect email/password combination.');
                    }
                }
            }
        }

        const passwordConfirmed = await compare(password, user.password);
        if (!passwordConfirmed) {
            throw new AppError('Incorrect email/password combination.');
        }
        const token = sign({ role: role }, auth.jwt.secret, {
            subject: user.id,
            expiresIn: '2h'
        })
        return { user, token };
    }
}