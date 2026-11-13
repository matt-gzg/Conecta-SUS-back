import AppError from "@shared/errors/AppError";
import Record from "../typeorm/entities/Record";
import { RecordsRepository } from "../typeorm/repositories/RecordsRepository";

interface IRequest {
    id: string;
    aproved: boolean;
    observation?: string;
}

export default class ApproveRecordService {
    public async execute({ id, aproved, observation }: IRequest): Promise<Record> {
        const record = await RecordsRepository.findById(id);

        if (!record) {
            throw new AppError("Record not found.");
        }

        record.aproved = aproved;
        if (observation !== undefined){
            record.professor_observation = observation;
        }

        await RecordsRepository.save(record);

        return record;
    }
}
