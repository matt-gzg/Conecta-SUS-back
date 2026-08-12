import { Router } from "express";
import RecordsController from "../controllers/RecordsController";
import { celebrate, Joi, Segments } from "celebrate";
import isAuthenticatedSecretary from "@shared/http/middlewares/isAuthenticatedSecretary";
import isAuthenticatedIntern from "@shared/http/middlewares/isAuthenticatedIntern";
import isAuthenticatedProfessor from "@shared/http/middlewares/isAuthenticatedProfessor";
import isAuthenticatedInternOrProfessor from "@shared/http/middlewares/isAuthenticatedInternOrProfessor";
import isAuthenticatedProfileRole from "@shared/http/middlewares/isAuthenticatedProfileRole";
import ensureCanAccessRecord from "@shared/http/middlewares/ensureCanAccessRecord";
import multer from "multer";
import uploadConfig from "@config/upload";

const recordsRouter = Router();
const recordsController = new RecordsController();
const upload = multer(uploadConfig);

recordsRouter.get('/', isAuthenticatedProfileRole, async (req, res, next) => {
    try {
        await recordsController.index(req, res, next);
    } catch (err) { next(err); }
});

recordsRouter.get('/patient/:id', celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() }
}), isAuthenticatedProfileRole, async (req, res, next) => {
    try {
        await recordsController.listByPatient(req, res, next);
    } catch (err) { next(err); }
});

recordsRouter.get('/appointment/:id', celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() }
}), isAuthenticatedProfileRole, async (req, res, next) => {
    try {
        await recordsController.showByAppointment(req, res, next);
    } catch (err) { next(err); }
});

recordsRouter.get('/intern', isAuthenticatedProfileRole, async (req, res, next) => {
    try {
        await recordsController.listByIntern(req, res, next);
    } catch (err) { next(err); }
});

recordsRouter.get('/document/:filename', celebrate({
    [Segments.PARAMS]: { filename: Joi.string().required() }
}), isAuthenticatedInternOrProfessor, async (req, res, next) => {
    try {
        await recordsController.getDocumentByName(req, res, next);
    } catch (err) { next(err); }
});

recordsRouter.get('/:id', celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() }
}), isAuthenticatedInternOrProfessor, ensureCanAccessRecord, async (req, res, next) => {
    try {
        await recordsController.show(req, res, next);
    } catch (err) { next(err); }
});

recordsRouter.post('/',
    celebrate({
        [Segments.BODY]: {
            anamnesis: Joi.string().required(),
            physicalExam: Joi.string().required(),
            conduct: Joi.string().required(),
            solicitedTests: Joi.string().allow('', null).optional(),
            instructions: Joi.string().allow('', null).optional(),
            prescription: Joi.string().allow('', null).optional(),
            cid10: Joi.string().allow('', null).optional(),
            aproved: Joi.boolean().allow(null).optional(),
            intern_id: Joi.string().uuid().required(),
            patient_id: Joi.string().uuid().required(),
            appointment_id: Joi.string().uuid().required(),
        }
    }), isAuthenticatedIntern, async (req, res, next) => {
        try {
            await recordsController.create(req, res, next);
        } catch (err) { next(err); }
    });

recordsRouter.put('/:id',
    celebrate({
        [Segments.PARAMS]: { id: Joi.string().uuid().required() },
        [Segments.BODY]: {
            anamnesis: Joi.string().required(),
            physicalExam: Joi.string().required(),
            solicitedTests: Joi.string().allow('', null).optional(),
            instructions: Joi.string().allow('', null).optional(),
            prescription: Joi.string().allow('', null).optional(),
            conduct: Joi.string().required(),
            cid10: Joi.string().allow('', null).optional(),
            aproved: Joi.boolean().allow(null).optional(),
            intern_id: Joi.string().uuid().required(),
            patient_id: Joi.string().uuid().required(),
            appointment_id: Joi.string().uuid().required(),
        }
    }), isAuthenticatedInternOrProfessor, ensureCanAccessRecord, async (req, res, next) => {
        try {
            await recordsController.update(req, res, next);
        } catch (err) { next(err); }
    });

recordsRouter.delete('/:id', celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() }
}), isAuthenticatedInternOrProfessor, ensureCanAccessRecord, async (req, res, next) => {
    try {
        await recordsController.delete(req, res, next);
    } catch (err) { next(err); }
});

recordsRouter.patch('/approve/:id',
    celebrate({
        [Segments.PARAMS]: { id: Joi.string().uuid().required() },
        [Segments.BODY]: {
            aproved: Joi.boolean().required(),
            observacaoProfessor: Joi.string().allow('', null).optional(), 
        },
    }),
    isAuthenticatedProfessor, ensureCanAccessRecord,
    async (req, res, next) => {
        try {
            await recordsController.approve(req, res, next);
        }
        catch (err) {
            next(err);
        }
    });

recordsRouter.patch('/:id/document', celebrate({
    [Segments.PARAMS]: { id: Joi.string().uuid().required() }
}), isAuthenticatedInternOrProfessor, ensureCanAccessRecord, upload.single('document'), async (req, res, next) => {
    try {
        await recordsController.uploadDocument(req, res, next);
    } catch (err) { next(err); }
});

export default recordsRouter;