import { Entity, Column, ManyToOne } from "typeorm";

import { User } from "../user/user.entity";
import { EntityBase } from "../lib/entitybase";

@Entity()
export class Contact extends EntityBase {

    @Column()
    type: string;

    @Column()
    value: string;

    @ManyToOne(() => User)
    owner: User;
}
