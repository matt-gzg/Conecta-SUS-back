import { AppDataSource } from "@shared/typeorm/data-source";
import Professor from "../entities/Professor";

export const ProfessorsRepository = AppDataSource.getRepository(Professor).extend({
    async findByName(name: string): Promise<Professor | null> {
        const professor = this.findOne({ where: { name } });
        return professor;
    },

    async findById(id: string): Promise<Professor | null> {
        const professor = this.findOne({ where: { id } });
        return professor;
    },

    async findByEmail(email: string): Promise<Professor | null> {
        const professor = this.findOne({ where: { email } });
        return professor;
    }
})