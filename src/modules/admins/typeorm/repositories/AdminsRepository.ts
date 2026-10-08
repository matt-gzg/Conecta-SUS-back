import { AppDataSource } from "@shared/typeorm/data-source"
import Admin from "../entities/Admin"

const hidePassword = (admin: Admin): Admin => {
    Object.defineProperty(admin, "password", { enumerable: false, configurable: true, writable: true });
    return admin;
};

export const AdminsRepository = AppDataSource.getRepository(Admin).extend({
    async find(): Promise<Admin[]> {
        return AppDataSource.getRepository(Admin).find({
            select: {
                id: true,
                name: true,
                email: true,
            },
        });
    },

    async findByName(name: string): Promise<Admin | null> {
        const admin = await this.findOne({
            where: { name },
            select: { id: true, name: true, email: true },
        });
        return admin;
    },

    async findById(id: string): Promise<Admin | null> {
        const admin = await this.findOne({
            where: { id },
            select: { id: true, name: true, email: true },
        });
        return admin ? hidePassword(admin) : null;
    },

    async findByEmail(email: string): Promise<Admin | null> {
        const admin = await this.findOne({
            where: { email },
            select: { id: true, name: true, email: true, password: true },
        });
        return admin ? hidePassword(admin) : null;
    }
})
