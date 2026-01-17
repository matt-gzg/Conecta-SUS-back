import Record from "../typeorm/entities/Record";
import { RecordsRepository } from "../typeorm/repositories/RecordsRepository";

export default class ListRecordService {
    public async execute(): Promise<Record[]> {
        const records = await RecordsRepository.find();
        return records;
    }
}