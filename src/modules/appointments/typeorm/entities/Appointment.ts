import Intern from "@modules/interns/typeorm/entities/Intern";
import Patient from "@modules/patients/typeorm/entities/Patient";
import Professor from "@modules/professors/typeorm/entities/Professor";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('appointments')
export default class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    date_time: Date;
    @Column()
    status: string;
    @Column()
    professor_id: string;

    @ManyToOne(() => Intern)
    @JoinColumn({ name: 'intern_id' })
    intern: Intern;

    @ManyToOne(() => Patient)
    @JoinColumn({ name: 'patient_id' })
    patient: Patient;

    @ManyToOne(() => Professor)
    @JoinColumn({ name: 'professor_id' })
    professor: Professor;

    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}