import { AppDataSource } from "@shared/typeorm/data-source";
import Intern from "../entities/Intern";

export const InternsRepository = AppDataSource.getRepository(Intern).extend({
    async findByName(name: string): Promise<Intern | null> {
        const intern = this.findOne({ where: { name } });
        return intern;
    },

    async findById(id: string): Promise<Intern | null> {
        const intern = this.findOne({ where: { id } });
        return intern;
    },

    async findByEmail(email: string): Promise<Intern | null> {
        const intern = this.findOne({ where: { email } });
        return intern;
    },

    async findByProfessor(professor_id: string): Promise<Intern[] | null>{
        const intern = this.find({where: {professor: {id : professor_id}}});
        return intern;
    }
})