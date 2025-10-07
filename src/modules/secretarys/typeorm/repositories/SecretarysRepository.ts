import { AppDataSource } from "@shared/typeorm/data-source"
import Secretary from "../entities/Secretary"

export const SecretarysRepository = AppDataSource.getRepository(Secretary).extend({
    async findByName(name : string) : Promise<Secretary | null> {
        const secretary = this.findOne({where: {name}});
        return secretary;  
    },

    async findById(id : string) : Promise<Secretary | null>{
        const secretary = this.findOne({where:{id}});
        return secretary;
    },

    async findByEmail(email : string) : Promise<Secretary | null>{
        const user = this.findOne({where:{email}});
        return user;
    }
})
