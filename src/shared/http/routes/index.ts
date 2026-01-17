import adminsRouter from "@modules/admins/routes/admins.routes";
import sessionsRouter from "@modules/sessions/routes/sessions.routes";
import internsRouter from "@modules/interns/routes/interns.routes";
import professorsRouter from "@modules/professors/routes/professors.routes";
import patientsRouter from "@modules/patients/routes/patients.routes";
import secretarysRouter from "@modules/secretarys/routes/secretarys.routes";
import appointmentsRouter from "@modules/appointments/routes/appointments.routes";
import recordsRouter from "@modules/records/routes/records.routes";
import { Router } from "express";

const routes = Router();

routes.use('/secretarys', secretarysRouter);
routes.use('/admins', adminsRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/professors', professorsRouter);
routes.use('/interns', internsRouter);
routes.use('/patients', patientsRouter);
routes.use('/appointments', appointmentsRouter);
routes.use('/records', recordsRouter);

export default routes;