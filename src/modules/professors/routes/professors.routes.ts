import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import ProfessorsController from "../controllers/ProfessorsController";
import isAuthenticatedSecretary from "@shared/http/middlewares/isAuthenticatedSecretary";

const professorsRouter = Router();
const professorsController = new ProfessorsController();
proffessorsRouter.use(isAuthenticatedSecretary);

professorsRouter.get('/', async (req, res, next) => {
    try {
        await professorsController.index(req, res, next);
    }
    catch (err) {
        next(err);
    }
});

professorsRouter.get('/:id', celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() }
}),
    async (req, res, next) => {
        try {
            await professorsController.show(req, res, next);
        }
        catch (err) {
            next(err);
        }
    });

professorsRouter.post('/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            departament: Joi.string().required(),
            password: Joi.string().min(6).required(),
        }
    }),
    async (req, res, next) => {
        try {
            await professorsController.create(req, res, next);
        }
        catch (err) {
            next(err);
        }
    });

professorsRouter.put('/:id',
    celebrate({
        [Segments.PARAMS]: { id: Joi.string().uuid().required() },
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            departament: Joi.string().required(),
            old_password: Joi.string().min(6),
            password: Joi.string().min(6).optional(),
            password_confirmation: Joi.string().valid(Joi.ref("password")).when("password", { is: Joi.exist(), then: Joi.required() }),
        }
    }),
    async (req, res, next) => {
        try {
            await professorsController.update(req, res, next);
        }
        catch (err) {
            next(err);
        }
    });

professorsRouter.delete('/:id',
    celebrate({ [Segments.PARAMS]: { id: Joi.string().uuid().required() } }),
    async (req, res, next) => {
        try {
            await professorsController.delete(req, res, next);
        }
        catch (err) {
            next(err);
        }
    });

export default professorsRouter;