import { Between } from "typeorm";
import { AppDataSource } from "@shared/typeorm/data-source";
import Appointment from "../entities/Appointment";

export const AppointmentsRepository = AppDataSource.getRepository(Appointment).extend({
    async findAll(): Promise<Appointment[]> {
        const appointments = await this.find({
            select: {
                intern: {
                    id: true,
                    name: true,
                },
                patient: {
                    id: true,
                    name: true,
                },
            },
            relations: {
                intern: true,
                patient: true,
            },
        });
        return appointments;
    },

    async findById(id: string): Promise<Appointment | null> {
        const appointment = this.findOne({ where: { id }, relations: { intern: true, patient: true } });
        return appointment;
    },

    async findByIntern(intern_id: string): Promise<Appointment[]> {
        const appointment = this.find({
            where: { intern: { id: intern_id } }, select: {
                intern: {
                    id: true,
                    name: true,
                },
                patient: {
                    id: true,
                    name: true,
                },
            }, relations: { intern: true, patient: true }
        });
        return appointment;
    },

    async findByPatient(patient_id: string): Promise<Appointment[]> {
        const appointment = this.find({
            where: { patient: { id: patient_id } }, select: {
                intern: {
                    id: true,
                    name: true,
                },
                patient: {
                    id: true,
                    name: true,
                },
            }, relations: { intern: true, patient: true }
        });
        return appointment;
    },

    async findByDate(date: Date): Promise<Appointment[]> {
        const startOfDay = new Date(Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate(),
            0, 0, 0, 0,
        ));

        const endOfDay = new Date(Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate(),
            23, 59, 59, 999,
        ));

        const appointment = this.find({
            where: { date_time: Between(startOfDay, endOfDay) }, select: {
                intern: {
                    id: true,
                    name: true,
                },
                patient: {
                    id: true,
                    name: true,
                },
            }, relations: { intern: true, patient: true }
        });
        return appointment;
    }
})