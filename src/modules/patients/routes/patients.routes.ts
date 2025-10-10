import { Router } from "express";
import PatientsController from "../controllers/PatientsController";
import { celebrate, Joi, Segments } from "celebrate";

const patientsRouter = Router();
const patientsController = new PatientsController();

patientsRouter.get('/', async (req, res, next) => {
    try {
        await patientsController.index(req, res, next);
    }
    catch (err) {
        next(err);
    }
});

patientsRouter.get('/:id', celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() }
}),
    async (req, res, next) => {
        try {
            await patientsController.show(req, res, next);
        }
        catch (err) {
            next(err);
        }
    });

patientsRouter.post('/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            cpf: Joi.string().required().length(11),
            susnumber: Joi.string().required(),
            email: Joi.string().email().optional(),
            birth_date: Joi.date().required(),
            phone: Joi.string().required(),
            gender: Joi.string().required(),
            cep: Joi.string().required(),
            city: Joi.string().required(),
            street: Joi.string().required(),
            district: Joi.string().required(),
            number: Joi.string().required(),
            complement: Joi.string().optional(),
        }
    }),
    async (req, res, next) => {
        try {
            await patientsController.create(req, res, next);
        }
        catch (err) {
            next(err);
        }
    });

patientsRouter.put('/:id',
    celebrate({
        [Segments.PARAMS]: { id: Joi.string().uuid().required() },
        [Segments.BODY]: {
            name: Joi.string().required(),
            cpf: Joi.string().required().length(11),
            susnumber: Joi.string().required(),
            email: Joi.string().email().optional(),
            birth_date: Joi.date().required(),
            phone: Joi.string().required(),
            gender: Joi.string().required(),
            cep: Joi.string().required(),
            city: Joi.string().required(),
            street: Joi.string().required(),
            district: Joi.string().required(),
            number: Joi.string().required(),
            complement: Joi.string().optional(),
        }
    }),
    async (req, res, next) => {
        try {
            await patientsController.update(req, res, next);
        }
        catch (err) {
            next(err);
        }
    });

patientsRouter.delete('/:id',
    celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
    async (req, res, next) => {
        try {
            await patientsController.delete(req, res, next);
        }
        catch (err) {
            next(err);
        }
    });

export default patientsRouter;