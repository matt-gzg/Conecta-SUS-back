import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import AppointmentsController from "../controllers/AppointmentsController";
import isAuthenticatedSecretary from "@shared/http/middlewares/isAuthenticatedSecretary";

const appointmentsRouter = Router();
const appointmentsController = new AppointmentsController();
appointmentsRouter.use(isAuthenticatedSecretary);

appointmentsRouter.get('/', async (req, res, next) => {
    try {
        await appointmentsController.index(req, res, next);
    }
    catch (err) {
        next(err);
    }
});

appointmentsRouter.get('/:id', celebrate({
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

appointmentsRouter.get('/intern/:id', celebrate({
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

appointmentsRouter.get('/patient/:id', celebrate({
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

appointmentsRouter.get('/date/:date', celebrate({
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
    celebrate({
        [Segments.BODY]: {
            date_time: Joi.string().isoDate().required(),
            status: Joi.string().required(),
            intern_id: Joi.string().uuid().required(),
            patient_id: Joi.string().uuid().required(),
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
    celebrate({
        [Segments.PARAMS]: { id: Joi.string().uuid().required() },
        [Segments.BODY]: {
            date_time: Joi.string().isoDate().required(),
            status: Joi.string().required(),
            intern_id: Joi.string().uuid().required(),
            patient_id: Joi.string().uuid().required(),
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