import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import SessionsController from "../controllers/SessionsController";

const sessionsAdminRouter = Router();
const sessionsController = new SessionsController();

sessionsAdminRouter.post('/', celebrate({ 
        [Segments.BODY]: {
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }}),
    async(req, res, next) =>{
    try{
        await sessionsController.create(req, res, next);
    }
    catch(err){
        next(err);
    }
});

export default sessionsAdminRouter;