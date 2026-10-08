import { AppDataSource } from "@shared/typeorm/data-source"
import Secretary from "../entities/Secretary"

const hidePassword = (secretary: Secretary): Secretary => {
    Object.defineProperty(secretary, "password", { enumerable: false, configurable: true, writable: true });
    return secretary;
};

export const SecretarysRepository = AppDataSource.getRepository(Secretary).extend({
    async find(): Promise<Secretary[]> {
        return AppDataSource.getRepository(Secretary).find({
            select: {
                id: true,
                name: true,
                email: true,
            },
        });
    },

    async findByName(name : string) : Promise<Secretary | null> {
        const secretary = await this.findOne({
            where: { name },
            select: { id: true, name: true, email: true },
        });
        return secretary;  
    },

    async findById(id : string) : Promise<Secretary | null>{
        const secretary = await this.findOne({
            where: { id },
            select: { id: true, name: true, email: true, password: true },
        });
        return secretary ? hidePassword(secretary) : null;
    },

    async findByEmail(email : string) : Promise<Secretary | null>{
        const secretary = await this.findOne({
            where: { email },
            select: { id: true, name: true, email: true, password: true },
        });
        return secretary ? hidePassword(secretary) : null;
    }
})
