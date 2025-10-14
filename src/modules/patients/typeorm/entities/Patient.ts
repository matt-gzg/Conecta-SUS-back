import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('patients')
export default class Patient {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    name: string;
    @Column()
    cpf: string;
    @Column()
    susnumber: string;
    @Column()
    email: string;
    @Column()
    birth_date: Date;
    @Column()
    phone: string;
    @Column()
    gender: string;
    @Column()
    cep: string;
    @Column()
    city: string;
    @Column()
    street: string;
    @Column()
    district: string;
    @Column()
    number: string;
    @Column()
    complement: string;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}