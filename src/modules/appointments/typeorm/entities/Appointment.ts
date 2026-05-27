import Intern from "@modules/interns/typeorm/entities/Intern";
import Patient from "@modules/patients/typeorm/entities/Patient";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('appointments')
export default class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    date_time: Date;
    @Column()
    status: string;

    @ManyToOne(() => Intern)
    @JoinColumn({ name: 'intern_id' })
    intern: Intern;

    @ManyToOne(() => Patient)
    @JoinColumn({ name: 'patient_id' })
    patient: Patient;

    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}