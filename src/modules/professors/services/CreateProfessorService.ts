import { hash } from "bcryptjs";
import AppError from "@shared/errors/AppError";
import Professor from "../typeorm/entities/Professor";
import { ProfessorsRepository } from "../typeorm/repositories/ProfessorsRepository";

interface IRequest {
    name: string;
    email: string;
    departament: string
    password: string;
}

export default class CreateProfessorService {
    public async execute({name, email, departament, password} : IRequest): Promise<Professor> {
        const emailExists = await ProfessorsRepository.findByEmail(email);
        if(emailExists){
            throw new AppError('Email address already used.');
        }
        const hashedPassword = await hash(password, 8);
        const professor = ProfessorsRepository.create({name, email, password: hashedPassword, departament});
        await ProfessorsRepository.save(professor);
        return professor;
    }
}