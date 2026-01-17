import { Router } from "express";
import RecordsController from "../controllers/RecordsController";
import { celebrate, Joi, Segments } from "celebrate";
import isAuthenticatedSecretary from "@shared/http/middlewares/isAuthenticatedSecretary";

const recordsRouter = Router();
const recordsController = new RecordsController();
recordsRouter.use(isAuthenticatedSecretary);

recordsRouter.get('/', async (req, res, next) => {
    try {
        await recordsController.index(req, res, next);
    }
    catch (err) {
        next(err);
    }
});

recordsRouter.get('/:id', celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() }
}),
    async (req, res, next) => {
        try {
            await recordsController.show(req, res, next);
        }
        catch (err) {
            next(err);
        }
    });

recordsRouter.get('/patient/:id', celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() }
}),
    async (req, res, next) => {
        try {
            await recordsController.listByPatient(req, res, next);
        }
        catch (err) {
            next(err);
        }
    });

recordsRouter.get('/intern/:id', celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() }
}),
    async (req, res, next) => {
        try {
            await recordsController.listByIntern(req, res, next);
        }
        catch (err) {
            next(err);
        }
    });

recordsRouter.get('/appointment/:id', celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() }
}),
    async (req, res, next) => {
        try {
            await recordsController.showByAppointment(req, res, next);
        }
        catch (err) {
            next(err);
        }
    });

recordsRouter.post('/',
    celebrate({
        [Segments.BODY]: {
            anamnesis: Joi.string().required(),
            physicalExam: Joi.string().required(),
            solicitedTests: Joi.string().required(),
            instructions: Joi.string().required(),
            prescription: Joi.string().required(),
            conduct: Joi.string().required(),
            cid10: Joi.string().required(),
            aproved: Joi.boolean(),
            intern_id: Joi.string().uuid().required(),
            patient_id: Joi.string().uuid().required(),
            appointment_id: Joi.string().uuid().required(),
        }
    }),
    async (req, res, next) => {
        try {
            await recordsController.create(req, res, next);
        }
        catch (err) {
            next(err);
        }
    });

recordsRouter.put('/:id',
    celebrate({
        [Segments.PARAMS]: { id: Joi.string().uuid().required() },
        [Segments.BODY]: {
            anamnesis: Joi.string().required(),
            physicalExam: Joi.string().required(),
            solicitedTests: Joi.string().required(),
            instructions: Joi.string().required(),
            prescription: Joi.string().required(),
            conduct: Joi.string().required(),
            cid10: Joi.string().required(),
            aproved: Joi.boolean(),
            intern_id: Joi.string().uuid().required(),
            patient_id: Joi.string().uuid().required(),
            appointment_id: Joi.string().uuid().required(),
        }
    }),
    async (req, res, next) => {
        try {
            await recordsController.update(req, res, next);
        }
        catch (err) {
            next(err);
        }
    });

recordsRouter.delete('/:id',
    celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
    async (req, res, next) => {
        try {
            await recordsController.delete(req, res, next);
        }
        catch (err) {
            next(err);
        }
    });

export default recordsRouter;