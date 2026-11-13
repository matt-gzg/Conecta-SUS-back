import Appointment from "@modules/appointments/typeorm/entities/Appointment";
import Intern from "@modules/interns/typeorm/entities/Intern";
import Patient from "@modules/patients/typeorm/entities/Patient";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('records')
export default class Record {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column({ type: 'jsonb' })
    anamnesis: {
        qp: string;
        hma: string;
        hmp: string;
        hmf: string;
    };
    @Column()
    physicalExam: string;
    @Column()
    solicitedExams: string;
    @Column()
    realizedExams: string;
    @Column()
    diagnosticHypothesis: string;
    @Column({ nullable: true })
    returnDate: string | null;
    @Column()
    instructions: string;
    @Column()
    prescription: string;
    @Column()
    conduct: string;
    @Column()
    cid10: string
    @Column({ default: false, nullable: true })
    aproved: boolean;
    @Column({ nullable: true })
    document: string;
    @Column({ nullable: true })
    professor_observation: string;

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