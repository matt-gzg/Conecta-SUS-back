import { AppDataSource } from "@shared/typeorm/data-source";
import Intern from "../entities/Intern";

const hidePassword = (intern: Intern): Intern => {
    Object.defineProperty(intern, "password", { enumerable: false, configurable: true, writable: true });
    return intern;
};

export const InternsRepository = AppDataSource.getRepository(Intern).extend({
    async find(): Promise<Intern[]> {
        return AppDataSource.getRepository(Intern).find({
            select: {
                id: true,
                name: true,
                email: true,
                departament: true,
            },
        });
    },

    async findByName(name: string): Promise<Intern | null> {
        const intern = await this.findOne({
            where: { name },
            select: { id: true, name: true, email: true, departament: true },
        });
        return intern;
    },

    async findById(id: string): Promise<Intern | null> {
        const intern = await this.findOne({
            where: { id },
            select: {
                id: true,
                name: true,
                email: true,
                departament: true,
                password: true,
                professor: { id: true, name: true },
            },
            relations: { professor: true },
        });
        return intern ? hidePassword(intern) : null;
    },

    async findByEmail(email: string): Promise<Intern | null> {
        const intern = await this.findOne({
            where: { email },
            select: {
                id: true,
                name: true,
                email: true,
                departament: true,
                password: true,
            },
        });
        return intern ? hidePassword(intern) : null;
    },

    async findByProfessor(professor_id: string): Promise<Intern[] | null>{
        const intern = await AppDataSource.getRepository(Intern).find({
            where: { professor: { id: professor_id } },
            select: { id: true, name: true, email: true, departament: true },
        });
        return intern;
    }
})