import Record from "../typeorm/entities/Record";
import { RecordsRepository } from "../typeorm/repositories/RecordsRepository";

interface IRequest {
    id: string;
}

export default class ListRecordByInternService {
    public async execute({ id }: IRequest): Promise<Record[]> {
        const records = await RecordsRepository.findByIntern(id);
        return records;
    }
}