import { Router } from "express";
import SecretarysController from "../controllers/SecretarysController";
import { celebrate, Joi, Segments } from "celebrate";
import isAuthenticatedAdmin from "@shared/http/middlewares/isAuthenticatedAdmin";

const secretarysRouter = Router();
const secretarysController = new SecretarysController();
secretarysRouter.use(isAuthenticatedAdmin);

secretarysRouter.get('/', async (req, res, next) => {
    try {
        await secretarysController.index(req, res, next);
    }
    catch (err) {
        next(err);
    }
});

secretarysRouter.get('/:id', celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() }
}),
    async (req, res, next) => {
        try {
            await secretarysController.show(req, res, next);
        }
        catch (err) {
            next(err);
        }
    });

secretarysRouter.post('/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
        }
    }),
    async (req, res, next) => {
        try {
            await secretarysController.create(req, res, next);
        }
        catch (err) {
            next(err);
        }
    });

secretarysRouter.put('/:id',
    celebrate({
        [Segments.PARAMS]: { id: Joi.string().uuid().required() },
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            old_password: Joi.string().min(6),
            password: Joi.string().min(6).optional(),
            password_confirmation: Joi.string().valid(Joi.ref("password")).when("password", { is: Joi.exist(), then: Joi.required() }),
        }
    }),
    async (req, res, next) => {
        try {
            await secretarysController.update(req, res, next);
        }
        catch (err) {
            next(err);
        }
    });

secretarysRouter.delete('/:id',
    celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
    async (req, res, next) => {
        try {
            await secretarysController.delete(req, res, next);
        }
        catch (err) {
            next(err);
        }
    });

export default secretarysRouter;