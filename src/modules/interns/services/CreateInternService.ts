import { hash } from "bcryptjs";
import AppError from "@shared/errors/AppError";
import Intern from "../typeorm/entities/Intern";
import { InternsRepository } from "../typeorm/repositories/InternsRepository";
import { ProfessorsRepository } from "@modules/professors/typeorm/repositories/ProfessorsRepository";

interface IRequest {
    name: string;
    email: string;
    departament: string;
    password: string;
    professor_id: string;
}

export default class CreateInternService {
    public async execute({name, email, departament, password, professor_id} : IRequest): Promise<Intern> {
        const professor = await ProfessorsRepository.findById(professor_id);
        if(!professor){
            throw new AppError('Could not find any professor with the given ids.')
        }
        
        const emailExists = await InternsRepository.findByEmail(email);
        if(emailExists){
            throw new AppError('Email address already used.');
        }
        const hashedPassword = await hash(password, 8);
        const intern = InternsRepository.create({name, email, password: hashedPassword, departament});
        await InternsRepository.save(intern);
        return intern;
    }
}