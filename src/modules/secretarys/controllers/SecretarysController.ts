import { NextFunction, Request, Response } from "express";
import ListSecretaryService from "../services/ListSecretaryService";
import ShowSecretaryService from "../services/ShowSecretaryService";
import CreateSecretaryService from "../services/CreateSecretaryService";
import UpdateSecretaryService from "../services/UpdateSecretaryService";
import DeleteSecretaryService from "../services/DeleteSecretaryService";

export default class SecretarysController {

    public async index(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const listSecretarys = new ListSecretaryService();
            const secretarys = await listSecretarys.execute();
            return response.json(secretarys);
        }
        catch (err) {
            next(err);
        }
    }

    public async show(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { id } = request.params;
            const showSecretarys = new ShowSecretaryService();
            const secretary = await showSecretarys.execute({ id });
            return response.json(secretary);
        }
        catch (err) {
            next(err);
        }
    }

    public async create(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { name, email, password } = request.body;
            const createSecretarys = new CreateSecretaryService();
            const secretary = await createSecretarys.execute({ name, email, password });
            return response.json(secretary);
        }
        catch (err) {
            next(err);
        }
    }

    public async update(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { id } = request.params;
            const { name, email, password, old_password } = request.body;
            const updateSecretarys = new UpdateSecretaryService();
            const secretary = await updateSecretarys.execute({ id, name, email, password, old_password });
            return response.json(secretary);
        }
        catch (err) {
            next(err);
        }
    }

    public async delete(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { id } = request.params;
            const deleteSecretarys = new DeleteSecretaryService();
            await deleteSecretarys.execute({ id });
            return response.json([]);
        }
        catch (err) {
            next(err);
        }
    }
}