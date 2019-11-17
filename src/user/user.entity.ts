import { Entity, Column, OneToMany, Unique } from "typeorm";

import { EntityBase } from "../lib/entitybase";
import { Contact } from "../contact/contact.entity";
import { Pet } from "../pet/pet.entity";

@Entity()
@Unique(['email'])
export class User extends EntityBase {

    @Column({ length: 50 })
    name: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Contact, (contact) => contact.owner,
        { eager: true, cascade: true })
    contacts: Contact[];

    @OneToMany(() => Pet, (pet) => pet.owner)
    pets: Pet[];
}