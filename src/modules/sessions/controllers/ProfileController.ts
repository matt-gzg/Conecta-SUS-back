import { NextFunction, Request, Response } from "express";
import ShowInternService from "@modules/interns/services/ShowInternService";
import UpdateInternService from "@modules/interns/services/UpdateInternService";
import ShowProfessorService from "@modules/professors/services/ShowProfessorService";
import UpdateProfessorService from "@modules/professors/services/UpdateProfessorService";
import ShowSecretaryService from "@modules/secretarys/services/ShowSecretaryService";
import UpdateSecretaryService from "@modules/secretarys/services/UpdateSecretaryService";
import AppError from "@shared/errors/AppError";

export default class ProfileController {
    public async show(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { id, role } = request.user;

            switch (role) {
                case "intern": {
                    const showIntern = new ShowInternService();
                    const intern = await showIntern.execute({ id });
                    return response.json(intern);
                }
                case "professor": {
                    const showProfessor = new ShowProfessorService();
                    const professor = await showProfessor.execute({ id });
                    return response.json(professor);
                }
                case "secretary": {
                    const showSecretary = new ShowSecretaryService();
                    const secretary = await showSecretary.execute({ id });
                    return response.json(secretary);
                }
                default:
                    throw new AppError("Insufficient permissions", 403);
            }
        } catch (err) {
            next(err);
        }
    }

    public async update(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { id, role } = request.user;
            const { name, email, departament, password, old_password, professor_id } = request.body;

            switch (role) {
                case "intern": {
                    if (!departament) {
                        throw new AppError("Departament is required.");
                    }
                    const updateIntern = new UpdateInternService();
                    const intern = await updateIntern.execute({
                        id,
                        name,
                        email,
                        departament,
                        password,
                        old_password,
                        professor_id,
                    });
                    return response.json(intern);
                }
                case "professor": {
                    if (!departament) {
                        throw new AppError("Departament is required.");
                    }
                    if (professor_id) {
                        throw new AppError("professor_id is not allowed.");
                    }
                    const updateProfessor = new UpdateProfessorService();
                    const professor = await updateProfessor.execute({
                        id,
                        name,
                        email,
                        departament,
                        password,
                        old_password,
                    });
                    return response.json(professor);
                }
                case "secretary": {
                    if (departament) {
                        throw new AppError("Departament is not allowed.");
                    }
                    if (professor_id) {
                        throw new AppError("professor_id is not allowed.");
                    }
                    const updateSecretary = new UpdateSecretaryService();
                    const secretary = await updateSecretary.execute({
                        id,
                        name,
                        email,
                        password,
                        old_password,
                    });
                    return response.json(secretary);
                }
                default:
                    throw new AppError("Insufficient permissions", 403);
            }
        } catch (err) {
            next(err);
        }
    }

    public async showIntern(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { id } = request.user;
            const showIntern = new ShowInternService();
            const intern = await showIntern.execute({ id });
            return response.json(intern);
        } catch (err) {
            next(err);
        }
    }

    public async updateIntern(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { id } = request.user;
            const { name, email, departament, password, old_password, professor_id } = request.body;
            const updateIntern = new UpdateInternService();
            const intern = await updateIntern.execute({ id, name, email, departament, password, old_password, professor_id });
            return response.json(intern);
        } catch (err) {
            next(err);
        }
    }

    public async showProfessor(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { id } = request.user;
            const showProfessor = new ShowProfessorService();
            const professor = await showProfessor.execute({ id });
            return response.json(professor);
        } catch (err) {
            next(err);
        }
    }

    public async updateProfessor(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { id } = request.user;
            const { name, email, departament, password, old_password } = request.body;
            const updateProfessor = new UpdateProfessorService();
            const professor = await updateProfessor.execute({ id, name, email, departament, password, old_password });
            return response.json(professor);
        } catch (err) {
            next(err);
        }
    }

    public async showSecretary(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { id } = request.user;
            const showSecretary = new ShowSecretaryService();
            const secretary = await showSecretary.execute({ id });
            return response.json(secretary);
        } catch (err) {
            next(err);
        }
    }

    public async updateSecretary(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { id } = request.user;
            const { name, email, password, old_password } = request.body;
            const updateSecretary = new UpdateSecretaryService();
            const secretary = await updateSecretary.execute({ id, name, email, password, old_password });
            return response.json(secretary);
        } catch (err) {
            next(err);
        }
    }
}
