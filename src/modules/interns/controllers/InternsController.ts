import { NextFunction, Request, Response } from "express";
import ListInternService from "../services/ListInternService";
import ShowInternService from "../services/ShowInternService";
import CreateInternService from "../services/CreateInternService";
import UpdateInternService from "../services/UpdateInternService";
import DeleteInternService from "../services/DeleteInternService";


export default class InternsController {

    public async index(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const listInterns = new ListInternService();
            const interns = await listInterns.execute();
            return response.json(interns);
        }
        catch (err) {
            next(err);
        }
    }

    public async show(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { id } = request.params;
            const showInterns = new ShowInternService();
            const intern = await showInterns.execute({ id });
            return response.json(intern);
        }
        catch (err) {
            next(err);
        }
    }

    public async create(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { name, email, departament, password, professor_id } = request.body;
            const createInterns = new CreateInternService();
            const intern = await createInterns.execute({ name, email, departament, password, professor_id });
            return response.json(intern);
        }
        catch (err) {
            next(err);
        }
    }

    public async update(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { id } = request.params;
            const { name, email, departament, password, old_password, professor_id } = request.body;
            const updateInterns = new UpdateInternService();
            const intern = await updateInterns.execute({ id, name, email, departament, password, old_password, professor_id });
            return response.json(intern);
        }
        catch (err) {
            next(err);
        }
    }

    public async delete(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { id } = request.params;
            const deleteInterns = new DeleteInternService();
            await deleteInterns.execute({ id });
            return response.json([]);
        }
        catch (err) {
            next(err);
        }
    }
}