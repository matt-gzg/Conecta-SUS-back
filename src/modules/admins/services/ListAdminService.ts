import Admin from "../typeorm/entities/Admin";
import { AdminsRepository } from "../typeorm/repositories/AdminsRepository";

export default class ListAdminService {
    public async execute(): Promise<Admin[]> {
        const admins = await AdminsRepository.find();
        return admins;
    }
}