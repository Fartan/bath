import { Entity, Column, OneToMany, ManyToOne } from "typeorm";

import { IsString, IsNotEmpty, IsDefined } from "class-validator";

import { EntityBase } from "../lib/entitybase";
import { User } from "../user/user.entity";
import { Purchase } from "../purchase/purchase.entity";

@Entity()
export class Pet extends EntityBase {

    @IsNotEmpty()
    @IsString()
    @Column()
    name: string;

    @IsDefined()
    @ManyToOne(() => User)
    owner: User;

    @OneToMany(() => Purchase, (purchase) => purchase.pet)
    purchase: Purchase[];
}
