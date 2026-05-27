import { NextFunction, Request, Response } from "express";
import ListAdminService from "../services/ListAdminService";
import CreateAdminService from "../services/CreateAdminService";

export default class AdminsController {

    public async index(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const listAdmins = new ListAdminService();
            const admins = await listAdmins.execute();
            return response.json(admins);
        }
        catch (err) {
            next(err);
        }
    }

    public async create(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { name, email, password } = request.body;
            const createAdmins = new CreateAdminService();
            const admin = await createAdmins.execute({ name, email, password });
            return response.json(admin);
        }
        catch (err) {
            next(err);
        }
    }
}