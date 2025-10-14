import { NextFunction, Request, Response } from "express";
import ListProfessorService from "../services/ListProfessorService";
import ShowProfessorService from "../services/ShowProfessorService";
import CreateProfessorService from "../services/CreateProfessorService";
import UpdateProfessorService from "../services/UpdateProfessorService";
import DeleteProfessorService from "../services/DeleteProfessorService";

export default class ProfessorsController {

    public async index(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const listProfessors = new ListProfessorService();
            const professors = await listProfessors.execute();
            return response.json(professors);
        }
        catch (err) {
            next(err);
        }
    }

    public async show(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { id } = request.params;
            const showProfessors = new ShowProfessorService();
            const professor = await showProfessors.execute({ id });
            return response.json(professor);
        }
        catch (err) {
            next(err);
        }
    }

    public async create(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { name, email, departament, password } = request.body;
            const createProfessors = new CreateProfessorService();
            const professor = await createProfessors.execute({ name, email, departament, password });
            return response.json(professor);
        }
        catch (err) {
            next(err);
        }
    }

    public async update(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { id } = request.params;
            const { name, email, departament, password, old_password } = request.body;
            const updateProfessors = new UpdateProfessorService();
            const professor = await updateProfessors.execute({ id, name, email, departament, password, old_password });
            return response.json(professor);
        }
        catch (err) {
            next(err);
        }
    }

    public async delete(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { id } = request.params;
            const deleteProfessors = new DeleteProfessorService();
            await deleteProfessors.execute({ id });
            return response.json([]);
        }
        catch (err) {
            next(err);
        }
    }
}