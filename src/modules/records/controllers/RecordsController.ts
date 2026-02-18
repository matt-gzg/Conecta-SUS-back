import { NextFunction, Request, Response } from "express";
import ListRecordService from "../services/ListRecordService";
import ShowRecordService from "../services/ShowRecordService";
import CreateRecordService from "../services/CreateRecordService";
import UpdateRecordService from "../services/UpdateRecordService";
import DeleteRecordService from "../services/DeleteRecordService";
import ListRecordByInternService from "../services/ListRecordByInternService";
import ListRecordByPatientService from "../services/ListRecordByPatientService";
import ShowRecordByAppointmentService from "../services/ShowRecordByAppointmentService";
import ApproveRecordService from "../services/ApproveRecordService";

export default class RecordsController {

    public async index(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const listRecords = new ListRecordService();
            const records = await listRecords.execute();
            return response.json(records);
        }
        catch (err) {
            next(err);
        }
    }

    public async listByPatient(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { id } = request.params;
            const listRecords = new ListRecordByPatientService();
            const records = await listRecords.execute({ id });
            return response.json(records);
        }
        catch (err) {
            next(err);
        }
    }

    public async listByIntern(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { id } = request.user;
            const listRecords = new ListRecordByInternService();
            const records = await listRecords.execute({ id });
            return response.json(records);
        }
        catch (err) {
            next(err);
        }
    }

    public async showByAppointment(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { id } = request.params;
            const showRecords = new ShowRecordByAppointmentService();
            const record = await showRecords.execute({ id });
            return response.json(record);
        }
        catch (err) {
            next(err);
        }
    }

    public async show(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { id } = request.params;
            const showRecords = new ShowRecordService();
            const record = await showRecords.execute({ id });
            return response.json(record);
        }
        catch (err) {
            next(err);
        }
    }

    public async create(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { anamnesis, physicalExam, solicitedTests, instructions, prescription, conduct, cid10, intern_id, patient_id, appointment_id } = request.body;
            const createRecords = new CreateRecordService();
            const record = await createRecords.execute({ anamnesis, physicalExam, solicitedTests, instructions, prescription, conduct, cid10, intern_id, patient_id, appointment_id });
            return response.json(record);
        }
        catch (err) {
            next(err);
        }
    }

    public async update(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { id } = request.params;
            const { anamnesis, physicalExam, solicitedTests, instructions, prescription, conduct, cid10, intern_id, patient_id, appointment_id } = request.body;
            const updateRecords = new UpdateRecordService();
            const record = await updateRecords.execute({ id, anamnesis, physicalExam, solicitedTests, instructions, prescription, conduct, cid10, intern_id, patient_id, appointment_id });
            return response.json(record);
        }
        catch (err) {
            next(err);
        }
    }

    public async approve(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { id } = request.params;
            const { aproved } = request.body;

            const approveRecord = new ApproveRecordService();
            const record = await approveRecord.execute({ id, aproved });

            return response.json(record);
        }
        catch (err) {
            next(err);
        }
    }

    public async delete(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { id } = request.params;
            const deleteRecords = new DeleteRecordService();
            await deleteRecords.execute({ id });
            return response.json([]);
        }
        catch (err) {
            next(err);
        }
    }
}