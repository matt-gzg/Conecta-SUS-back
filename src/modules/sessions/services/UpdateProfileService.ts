import AppError from "@shared/errors/AppError";
import UpdateInternService from "@modules/interns/services/UpdateInternService";
import UpdateProfessorService from "@modules/professors/services/UpdateProfessorService";
import UpdateSecretaryService from "@modules/secretarys/services/UpdateSecretaryService";
import Intern from "@modules/interns/typeorm/entities/Intern";
import Professor from "@modules/professors/typeorm/entities/Professor";
import Secretary from "@modules/secretarys/typeorm/entities/Secretary";

interface IRequest {
    id: string;
    role: string;
    name: string;
    email: string;
    departament?: string;
    password?: string;
    old_password?: string;
    professor_id?: string;
}

export default class UpdateProfileService {
    public async execute({
        id,
        role,
        name,
        email,
        departament,
        password,
        old_password,
        professor_id,
    }: IRequest): Promise<Intern | Professor | Secretary> {
        switch (role) {
            case "intern": {
                if (!departament) {
                    throw new AppError("Departament is required.");
                }
                const updateIntern = new UpdateInternService();
                return updateIntern.execute({
                    id,
                    name,
                    email,
                    departament,
                    password,
                    old_password,
                    professor_id,
                });
            }
            case "professor": {
                if (!departament) {
                    throw new AppError("Departament is required.");
                }
                if (professor_id) {
                    throw new AppError("professor_id is not allowed.");
                }
                const updateProfessor = new UpdateProfessorService();
                return updateProfessor.execute({
                    id,
                    name,
                    email,
                    departament,
                    password,
                    old_password,
                });
            }
            case "secretary": {
                if (departament) {
                    throw new AppError("Departament is not allowed.");
                }
                if (professor_id) {
                    throw new AppError("professor_id is not allowed.");
                }
                const updateSecretary = new UpdateSecretaryService();
                return updateSecretary.execute({
                    id,
                    name,
                    email,
                    password,
                    old_password,
                });
            }
            default:
                throw new AppError("Insufficient permissions", 403);
        }
    }
}
