import { NextFunction, Request, Response } from "express";
import ShowProfileService from "@modules/sessions/services/ShowProfileService";
import UpdateProfileService from "@modules/sessions/services/UpdateProfileService";

export default class ProfileController {
    public async show(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { id, role } = request.user;
            const showProfileService = new ShowProfileService();
            const profile = await showProfileService.execute({ id, role });
            return response.json(profile);
        } catch (err) {
            next(err);
        }
    }

    public async update(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { id, role } = request.user;
            const { name, email, departament, password, old_password, professor_id } = request.body;
            const updateProfileService = new UpdateProfileService();
            const profile = await updateProfileService.execute({
                id,
                role,
                name,
                email,
                departament,
                password,
                old_password,
                professor_id,
            });
            return response.json(profile);
        } catch (err) {
            next(err);
        }
    }
}
