import Intern from "@modules/interns/typeorm/entities/Intern";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('professors')
export default class Professor {
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

    @OneToMany(() => Intern, (intern) => intern.professor)
    interns: Intern[];

    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}