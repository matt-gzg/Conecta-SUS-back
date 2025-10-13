import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import InternsController from "../controllers/InternsController";

const internsRouter = Router();
const internsController = new InternsController();

internsRouter.get('/', async (req, res, next) => {
    try {
        await internsController.index(req, res, next);
    }
    catch (err) {
        next(err);
    }
});

internsRouter.get('/:id', celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() }
}),
    async (req, res, next) => {
        try {
            await internsController.show(req, res, next);
        }
        catch (err) {
            next(err);
        }
    });

internsRouter.post('/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            departament: Joi.string().required(),
            password: Joi.string().min(6).required(),
            professor_id: Joi.string().uuid().required()
        }
    }),
    async (req, res, next) => {
        try {
            await internsController.create(req, res, next);
        }
        catch (err) {
            next(err);
        }
    });

internsRouter.put('/:id',
    celebrate({
        [Segments.PARAMS]: { id: Joi.string().uuid().required() },
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            departament: Joi.string().required(),
            old_password: Joi.string().min(6),
            password: Joi.string().min(6).optional(),
            password_confirmation: Joi.string().valid(Joi.ref("password")).when("password", { is: Joi.exist(), then: Joi.required() }),
            professor_id: Joi.string().uuid().optional(),
        }
    }),
    async (req, res, next) => {
        try {
            await internsController.update(req, res, next);
        }
        catch (err) {
            next(err);
        }
    });

internsRouter.delete('/:id',
    celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
    async (req, res, next) => {
        try {
            await internsController.delete(req, res, next);
        }
        catch (err) {
            next(err);
        }
    });

export default internsRouter;