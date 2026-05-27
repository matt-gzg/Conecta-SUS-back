import Professor from "@modules/professors/typeorm/entities/Professor";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('interns')
export default class Intern {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    name: string;
    @Column()
    email: string;
    @Column()
    departament: string;
    @Column()
    password: string;

    @ManyToOne(() => Professor, (professor) => professor.interns)
    @JoinColumn({name: 'professor_id'})
    professor: Professor;

    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}