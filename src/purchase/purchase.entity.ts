import { Entity, ManyToMany, JoinTable, ManyToOne } from "typeorm";

import { IsDefined } from "class-validator";

import { EntityBase } from "../lib/entitybase";
import { Pet } from "../pet/pet.entity";
import { User } from "../user/user.entity";
import { Service } from "../service/service.entity";

@Entity()
export class Purchase extends EntityBase {

    constructor() {
        super();
        Object.defineProperty(this, 'total', {
            get() {
                return this.service.reduce((a, b) => a + b.price, 0);
            },
            enumerable: true
        });
    }

    @ManyToMany(() => Service, { eager: true })
    @JoinTable({ name: 'purchase_service' })
    service: Service[];

    @IsDefined()
    @ManyToOne(() => Pet, { eager: true })
    pet: Pet;

    @IsDefined()
    @ManyToOne(() => User, { eager: true })
    owner: User;
}
