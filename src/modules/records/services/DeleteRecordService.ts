import AppError from "@shared/errors/AppError";
import { RecordsRepository } from "../typeorm/repositories/RecordsRepository";

interface IRequest {
    id: string;
}

export default class DeleteRecordService {
    public async execute({ id }: IRequest): Promise<void> {
        const record = await RecordsRepository.findById(id);
        if (!record) {
            throw new AppError('Record not found.');
        }
        await RecordsRepository.remove(record);
    }
}