import adminsRouter from "@modules/admins/routes/admins.routes";
import sessionsAdminRouter from "@modules/admins/routes/sessionsAdmin.routes";
import internsRouter from "@modules/interns/routes/interns.routes";
import professorsRouter from "@modules/professors/routes/professors.routes";
import secretarysRouter from "@modules/secretarys/routes/secretarys.routes";
import { Router } from "express";

const routes = Router();

routes.use('/secretarys', secretarysRouter);
routes.use('/admins', adminsRouter);
routes.use('/sessions/admins', sessionsAdminRouter);
routes.use('/professors', professorsRouter);
routes.use('/interns', internsRouter);

export default routes;