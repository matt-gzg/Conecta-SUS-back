import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('secretarys')
export default class Secretary {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    email: string;
    @Column()
    name: string;
    @Column()
    password: string;
    @CreateDateColumn()
    created_at: Date;
    @UpdateDateColumn()
    updated_at: Date;
}