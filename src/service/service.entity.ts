import { Entity, Column } from "typeorm";

import { IsNotEmpty, IsString, IsNumber } from "class-validator";

import { EntityBase } from "../lib/entitybase";

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