import { NextFunction, Request, Response } from "express";
import ListPatientService from "../services/ListPatientService";
import ShowPatientService from "../services/ShowPatientService";
import CreatePatientService from "../services/CreatePatientService";
import UpdatePatientService from "../services/UpdatePatientService";
import DeletePatientService from "../services/DeletePatientService";

export default class PatientsController {

    public async index(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const listPatients = new ListPatientService();
            const patients = await listPatients.execute();
            return response.json(patients);
        }
        catch (err) {
            next(err);
        }
    }

    public async show(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { id } = request.params;
            const showPatients = new ShowPatientService();
            const patient = await showPatients.execute({ id });
            return response.json(patient);
        }
        catch (err) {
            next(err);
        }
    }

    public async create(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { name, cpf, susnumber, email, birth_date, phone, gender, cep, city, street, district, number, complement } = request.body;
            const createPatients = new CreatePatientService();
            const patient = await createPatients.execute({ name, cpf, susnumber, email, birth_date, phone, gender, cep, city, street, district, number, complement });
            return response.json(patient);
        }
        catch (err) {
            next(err);
        }
    }

    public async update(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { id } = request.params;
            const { name, cpf, susnumber, email, birth_date, phone, gender, cep, city, street, district, number, complement } = request.body;
            const updatePatients = new UpdatePatientService();
            const patient = await updatePatients.execute({ id, name, cpf, susnumber, email, birth_date, phone, gender, cep, city, street, district, number, complement });
            return response.json(patient);
        }
        catch (err) {
            next(err);
        }
    }

    public async delete(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { id } = request.params;
            const deletePatients = new DeletePatientService();
            await deletePatients.execute({ id });
            return response.json([]);
        }
        catch (err) {
            next(err);
        }
    }
}