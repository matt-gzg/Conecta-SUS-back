import { AppDataSource } from "@shared/typeorm/data-source";
import Professor from "../entities/Professor";

const hidePassword = (professor: Professor): Professor => {
    Object.defineProperty(professor, "password", { enumerable: false, configurable: true, writable: true });
    return professor;
};

export const ProfessorsRepository = AppDataSource.getRepository(Professor).extend({
    async find(): Promise<Professor[]> {
        return AppDataSource.getRepository(Professor).find({
            select: {
                id: true,
                name: true,
                email: true,
                departament: true,
            },
        });
    },

    async findByName(name: string): Promise<Professor | null> {
        const professor = await this.findOne({
            where: { name },
            select: { id: true, name: true, email: true, departament: true },
        });
        return professor;
    },

    async findById(id: string): Promise<Professor | null> {
        const professor = await this.findOne({
            where: { id },
            select: { id: true, name: true, email: true, departament: true, password: true },
        });
        return professor ? hidePassword(professor) : null;
    },

    async findByEmail(email: string): Promise<Professor | null> {
        const professor = await this.findOne({
            where: { email },
            select: { id: true, name: true, email: true, departament: true, password: true },
        });
        return professor ? hidePassword(professor) : null;
    },

    async findByIntern(intern_id: string): Promise<Professor[] | null>{
        const professor = await AppDataSource.getRepository(Professor).find({
            where: { interns: { id: intern_id } },
            select: { id: true, name: true },
        });
        return professor;
    }
})