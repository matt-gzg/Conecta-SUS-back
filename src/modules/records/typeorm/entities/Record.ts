import Appointment from "@modules/appointments/typeorm/entities/Appointment";
import Intern from "@modules/interns/typeorm/entities/Intern";
import Patient from "@modules/patients/typeorm/entities/Patient";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('records')
export default class Record {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    anamnesis: string;
    @Column()
    physicalExam: string;
    @Column()
    solicitedTests: string
    @Column()
    instructions: string;
    @Column()
    prescription: string
    @Column()
    conduct: string;
    @Column()
    cid10: string
    @Column({ default: false, nullable: true })
    aproved: boolean;

    @ManyToOne(() => Patient)
    @JoinColumn({ name: 'patient_id' })
    patient: Patient;

    @ManyToOne(() => Intern)
    @JoinColumn({ name: 'intern_id' })
    intern: Intern;

    @OneToOne(() => Appointment)
    @JoinColumn({ name: 'appointment_id' })
    appointment: Appointment;

    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}