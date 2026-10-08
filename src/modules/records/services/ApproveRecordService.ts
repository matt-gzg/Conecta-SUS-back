import AppError from "@shared/errors/AppError";
import Record from "../typeorm/entities/Record";
import { RecordsRepository } from "../typeorm/repositories/RecordsRepository";

interface IRequest {
    id: string;
    aproved: boolean;
    observacaoProfessor?: string;
}

export default class ApproveRecordService {
    public async execute({ id, aproved, observacaoProfessor }: IRequest): Promise<Record> {
        const record = await RecordsRepository.findById(id);

        if (!record) {
            throw new AppError("Record not found.");
        }

        record.aproved = aproved;
        if (observacaoProfessor !== undefined){
            record.professor_observation = observacaoProfessor;
        }

        await RecordsRepository.save(record);

        return record;
    }
}
