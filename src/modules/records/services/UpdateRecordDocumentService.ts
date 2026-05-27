import AppError from "@shared/errors/AppError";
import Record from "../typeorm/entities/Record";
import { RecordsRepository } from "../typeorm/repositories/RecordsRepository";

interface IRequest {
    id: string;
    documentFilename: string;
}

export default class UpdateRecordDocumentService {
    public async execute({ id, documentFilename }: IRequest): Promise<Record> {
        const record = await RecordsRepository.findById(id);
        if (!record) {
            throw new AppError('Record not found');
        }
        if (!documentFilename) {
            throw new AppError('Document file not provided');
        }

        record.document = documentFilename;
        await RecordsRepository.save(record);

        return record;
    }
}
