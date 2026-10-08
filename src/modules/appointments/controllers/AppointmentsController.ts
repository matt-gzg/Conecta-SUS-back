import { NextFunction, Request, Response } from "express";
import ListAppointmentService from "../services/ListAppointmentService";
import ShowAppointmentService from "../services/ShowAppointmentService";
import CreateAppointmentService from "../services/CreateAppointmentService";
import UpdateAppointmentService from "../services/UpdateAppointmentService";
import DeleteAppointmentService from "../services/DeleteAppointmentService";
import ListAppointmentByInternService from "../services/ListAppointmentByInternService";
import ListAppointmentByPatientService from "../services/ListAppointmentByPatientService";
import ListAppointmentByDateService from "../services/ListAppointmentByDateService";


export default class AppointmentsController {

    public async index(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const listAppointments = new ListAppointmentService();
            const appointments = await listAppointments.execute();
            return response.json(appointments);
        }
        catch (err) {
            next(err);
        }
    }

    public async listByIntern(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { id } = request.params;
            const listAppointmentsByIntern = new ListAppointmentByInternService();
            const appointments = await listAppointmentsByIntern.execute({ id });
            return response.json(appointments);
        }
        catch (err) {
            next(err);
        }
    }

    public async listByPatient(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { id } = request.params;
            const listAppointmentsByPatient = new ListAppointmentByPatientService();
            const appointments = await listAppointmentsByPatient.execute({ id });
            return response.json(appointments);
        }
        catch (err) {
            next(err);
        }
    }

    public async listByDate(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { date } = request.params;
            const listAppointmentsByDate = new ListAppointmentByDateService();
            const appointments = await listAppointmentsByDate.execute({ date: new Date(date) });
            return response.json(appointments);
        }
        catch (err) {
            next(err);
        }
    }

    public async show(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { id } = request.params;
            const showAppointments = new ShowAppointmentService();
            const appointment = await showAppointments.execute({ id });
            return response.json(appointment);
        }
        catch (err) {
            next(err);
        }
    }

    public async create(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { date_time, status, intern_id, patient_id , professor_id} = request.body;
            const createAppointments = new CreateAppointmentService();
            const appointment = await createAppointments.execute({ date_time, status, intern_id, patient_id, professor_id });
            return response.json(appointment);
        }
        catch (err) {
            next(err);
        }
    }

    public async update(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { id } = request.params;
            const { date_time, status, intern_id, patient_id , professor_id} = request.body;
            const updateAppointments = new UpdateAppointmentService();
            const appointment = await updateAppointments.execute({ id, date_time, status, intern_id, patient_id, professor_id });
            return response.json(appointment);
        }
        catch (err) {
            next(err);
        }
    }

    public async delete(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { id } = request.params;
            const deleteAppointments = new DeleteAppointmentService();
            await deleteAppointments.execute({ id });
            return response.json([]);
        }
        catch (err) {
            next(err);
        }
    }
}