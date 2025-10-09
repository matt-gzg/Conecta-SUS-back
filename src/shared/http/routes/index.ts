import secretarysRouter from "@modules/secretarys/routes/secretarys.routes";
import { Router } from "express";

const routes = Router();

routes.use('/secretarys', secretarysRouter);

export default routes;