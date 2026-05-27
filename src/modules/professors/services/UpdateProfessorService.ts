import { compare, hash } from "bcryptjs";
import AppError from "@shared/errors/AppError";
import Professor from "../typeorm/entities/Professor";
import { ProfessorsRepository } from "../typeorm/repositories/ProfessorsRepository";

interface IRequest {
    id: string;
    name: string;
    email: string;
    departament: string;
    password?: string;
    old_password?: string;
}

export default class UpdateProfessorService {
    public async execute({ id, name, email, departament, password, old_password }: IRequest): Promise<Professor> {
        const professor = await ProfessorsRepository.findById(id);
        if(!professor){
            throw new AppError('Professor not found.');
        }
        const professorUpdateEmail = await ProfessorsRepository.findByEmail(email);
        if (professorUpdateEmail && professorUpdateEmail.id != professor.id) {
            throw new AppError('There is alredy one professor with this email.');
        }
        if(password && !old_password){
            throw new AppError('Old password is required.');
        }
        if(password && old_password){
            const checkOldPassword = await compare(old_password, professor.password);
            if(!checkOldPassword){
                throw new AppError('Old password does not match.');
            }
            professor.password = await hash(password, 8);
        }
        professor.name = name;
        professor.email = email;
        professor.departament = departament;
        await ProfessorsRepository.save(professor);
        return professor;
    }
}