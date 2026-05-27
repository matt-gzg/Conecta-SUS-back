import { Router } from "express";
import AdminsController from "../controllers/AdminsController";
import { celebrate, Joi, Segments } from "celebrate";
import isAuthenticatedAdmin from "@shared/http/middlewares/isAuthenticatedAdmin";

const adminsRouter = Router();
const adminsController = new AdminsController();

adminsRouter.get('/', isAuthenticatedAdmin, async (req, res, next) => {
    try {
        await adminsController.index(req, res, next);
    }
    catch (err) {
        next(err);
    }
});

adminsRouter.post('/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(6).required(),
        }
    }),
    async (req, res, next) => {
        try {
            await adminsController.create(req, res, next);
        }
        catch (err) {
            next(err);
        }
    });

export default adminsRouter;