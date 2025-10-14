import { AppDataSource } from "@shared/typeorm/data-source"
import Admin from "../entities/Admin"

export const AdminsRepository = AppDataSource.getRepository(Admin).extend({
    async findByName(name: string): Promise<Admin | null> {
        const admin = this.findOne({ where: { name } });
        return admin;
    },

    async findById(id: string): Promise<Admin | null> {
        const admin = this.findOne({ where: { id } });
        return admin;
    },

    async findByEmail(email: string): Promise<Admin | null> {
        const admin = this.findOne({ where: { email } });
        return admin;
    }
})
