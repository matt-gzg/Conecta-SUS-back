import { compare, hash } from "bcryptjs";
import AppError from "@shared/errors/AppError";
import Intern from "../typeorm/entities/Intern";
import { InternsRepository } from "../typeorm/repositories/InternsRepository";
import { ProfessorsRepository } from "@modules/professors/typeorm/repositories/ProfessorsRepository";

interface IRequest {
    id: string;
    name: string;
    email: string;
    departament: string;
    password?: string;
    old_password?: string;
    professor_id?: string;
}

export default class UpdateInternService {
    public async execute({ id, name, email, departament, password, old_password, professor_id }: IRequest): Promise<Intern> {
        const intern = await InternsRepository.findById(id);
        if(!intern){
            throw new AppError('Intern not found.');
        }
        const internUpdateEmail = await InternsRepository.findByEmail(email);
        if (internUpdateEmail && internUpdateEmail.id != intern.id) {
            throw new AppError('There is alredy one intern with this email.');
        }
        if(password && !old_password){
            throw new AppError('Old password is required.');
        }
        if(password && old_password){
            const checkOldPassword = await compare(old_password, intern.password);
            if(!checkOldPassword){
                throw new AppError('Old password does not match.');
            }
            intern.password = await hash(password, 8);
        }
        if(professor_id) {
            const professor = await ProfessorsRepository.findById(professor_id);
            if(!professor){
                throw new AppError('Professor not found.');
            }
            intern.professor = professor;
        }

        intern.name = name;
        intern.email = email;
        intern.departament = departament;
        await InternsRepository.save(intern);
        return intern;
    }
}