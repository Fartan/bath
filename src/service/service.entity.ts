import { Entity, Column } from "typeorm";
import { EntityBase } from "../lib/entitybase";
import { IsNotEmpty, IsString, IsNumber } from "class-validator";

@Entity()
export class Service extends EntityBase {

    @IsNotEmpty()
    @IsString()
    @Column()
    name: string;

    @IsNotEmpty()
    @IsString()
    @Column()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    @Column()
    price: number;
}