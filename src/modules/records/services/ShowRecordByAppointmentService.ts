import AppError from "@shared/errors/AppError";
import Record from "../typeorm/entities/Record";
import { RecordsRepository } from "../typeorm/repositories/RecordsRepository";

interface IRequest {
    id: string;
}

export default class ShowRecordByAppointmentService {
    public async execute({ id }: IRequest): Promise<Record> {
        const record = await RecordsRepository.findByAppointment(id);
        if (!record) {
            throw new AppError('Record not found for the given appointment.');
        }
        return record;
    }
}