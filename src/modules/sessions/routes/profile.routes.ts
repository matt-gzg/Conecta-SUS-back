import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import ProfileController from "../controllers/ProfileController";
import isAuthenticatedProfileRole from "@shared/http/middlewares/isAuthenticatedProfileRole";

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.get("/", isAuthenticatedProfileRole, async (req, res, next) => {
    await profileController.show(req, res, next);
});

profileRouter.put(
    "/",
    isAuthenticatedProfileRole,
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().email().required(),
            departament: Joi.string().optional(),
            old_password: Joi.string().min(6).when("password", { is: Joi.exist(), then: Joi.required() }),
            password: Joi.string().min(6).optional(),
            password_confirmation: Joi.string()
                .valid(Joi.ref("password"))
                .when("password", { is: Joi.exist(), then: Joi.required(), otherwise: Joi.forbidden() }),
            professor_id: Joi.string().uuid().optional(),
        },
    }),
    async (req, res, next) => {
        await profileController.update(req, res, next);
    }
);

export default profileRouter;
