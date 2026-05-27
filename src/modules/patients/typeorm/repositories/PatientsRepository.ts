import { AppDataSource } from "@shared/typeorm/data-source"
import Patient from "../entities/Patient"

export const PatientsRepository = AppDataSource.getRepository(Patient).extend({
    async findByName(name : string) : Promise<Patient | null> {
        const patient = this.findOne({where: {name}});
        return patient;  
    },

    async findById(id : string) : Promise<Patient | null>{
        const patient = this.findOne({where:{id}});
        return patient;
    },

    async findByEmail(email : string) : Promise<Patient | null>{
        const patient = this.findOne({where:{email}});
        return patient;
    },

    async findBySUSNumber(susnumber : string) : Promise<Patient | null>{
        const patient = this.findOne({where:{susnumber}});
        return patient;
    },

    async findByCPF(cpf : string) : Promise<Patient | null>{
        const patient = this.findOne({where:{cpf}});
        return patient;
    }
})
