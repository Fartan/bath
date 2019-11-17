import { CreateDateColumn, PrimaryGeneratedColumn } from "typeorm";

export abstract class EntityBase {

    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @CreateDateColumn()
    createdAt: Date;

    @CreateDateColumn()
    updatedAt: Date;
}