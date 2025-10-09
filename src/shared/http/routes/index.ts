import adminsRouter from "@modules/admins/routes/admins.routes";
import sessionsAdminRouter from "@modules/admins/routes/sessionsAdmin.routes";
import secretarysRouter from "@modules/secretarys/routes/secretarys.routes";
import { Router } from "express";

const routes = Router();

routes.use('/secretarys', secretarysRouter);
routes.use('/admins', adminsRouter);
routes.use('/sessions/admins', sessionsAdminRouter);

export default routes;