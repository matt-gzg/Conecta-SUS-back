import AppError from "@shared/errors/AppError";
import ShowInternService from "@modules/interns/services/ShowInternService";
import ShowProfessorService from "@modules/professors/services/ShowProfessorService";
import ShowSecretaryService from "@modules/secretarys/services/ShowSecretaryService";
import Intern from "@modules/interns/typeorm/entities/Intern";
import Professor from "@modules/professors/typeorm/entities/Professor";
import Secretary from "@modules/secretarys/typeorm/entities/Secretary";

interface IRequest {
    id: string;
    role: string;
}

export default class ShowProfileService {
    public async execute({ id, role }: IRequest): Promise<Intern | Professor | Secretary> {
        switch (role) {
            case "intern": {
                const showIntern = new ShowInternService();
                return showIntern.execute({ id });
            }
            case "professor": {
                const showProfessor = new ShowProfessorService();
                return showProfessor.execute({ id });
            }
            case "secretary": {
                const showSecretary = new ShowSecretaryService();
                return showSecretary.execute({ id });
            }
            default:
                throw new AppError("Insufficient permissions", 403);
        }
    }
}
