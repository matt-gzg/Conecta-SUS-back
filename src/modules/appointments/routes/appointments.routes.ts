import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import AppointmentsController from "../controllers/AppointmentsController";
import isAuthenticatedSecretary from "@shared/http/middlewares/isAuthenticatedSecretary";
import isAuthenticatedProfileRole from "@shared/http/middlewares/isAuthenticatedProfileRole";

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();

appointmentsRouter.get('/', isAuthenticatedProfileRole, async (req, res, next) => {
    try {
        await appointmentsController.index(req, res, next);
    }
    catch (err) {
        next(err);
    }
});

appointmentsRouter.get('/:id', isAuthenticatedProfileRole, celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() }
}),
    async (req, res, next) => {
        try {
            await appointmentsController.show(req, res, next);
        }
        catch (err) {
            next(err);
        }
    });

appointmentsRouter.get('/intern/:id', isAuthenticatedProfileRole, celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() }
}),
    async (req, res, next) => {
        try {
            await appointmentsController.listByIntern(req, res, next);
        }
        catch (err) {
            next(err);
        }
    });

appointmentsRouter.get('/patient/:id', isAuthenticatedProfileRole, celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() }
}),
    async (req, res, next) => {
        try {
            await appointmentsController.listByPatient(req, res, next);
        }
        catch (err) {
            next(err);
        }
    });

appointmentsRouter.get('/date/:date', isAuthenticatedProfileRole, celebrate({
    [Segments.PARAMS]: { date: Joi.string().isoDate().required() }
}),
    async (req, res, next) => {
        try {
            await appointmentsController.listByDate(req, res, next);
        }
        catch (err) {
            next(err);
        }
    });

appointmentsRouter.post('/',
    isAuthenticatedSecretary,
    celebrate({
        [Segments.BODY]: {
            date_time: Joi.string().isoDate().required(),
            status: Joi.string().required(),
            intern_id: Joi.string().uuid().required(),
            patient_id: Joi.string().uuid().required(),
            professor_id: Joi.string().uuid().required(),
        }
    }),
    async (req, res, next) => {
        try {
            await appointmentsController.create(req, res, next);
        }
        catch (err) {
            next(err);
        }
    });

appointmentsRouter.put('/:id',
    isAuthenticatedProfileRole,
    celebrate({
        [Segments.PARAMS]: { id: Joi.string().uuid().required() },
        [Segments.BODY]: {
            date_time: Joi.string().isoDate().required(),
            status: Joi.string().required(),
            intern_id: Joi.string().uuid().required(),
            patient_id: Joi.string().uuid().required(),
            professor_id: Joi.string().uuid().required(),
        }
    }),
    async (req, res, next) => {
        try {
            await appointmentsController.update(req, res, next);
        }
        catch (err) {
            next(err);
        }
    });

appointmentsRouter.delete('/:id',
    isAuthenticatedSecretary,
    celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
    async (req, res, next) => {
        try {
            await appointmentsController.delete(req, res, next);
        }
        catch (err) {
            next(err);
        }
    });

export default appointmentsRouter;