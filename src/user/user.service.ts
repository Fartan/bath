import { InjectRepository } from "@nestjs/typeorm";
import { Injectable, Inject } from "@nestjs/common";

import { Repository } from "typeorm";

import * as bcrypt from 'bcrypt';

import { User } from "./user.entity";
import { CrudService } from "../lib/crud.service";
import { ContactService } from "../contact/contact.service";
import { Contact } from "../contact/contact.entity";
import { PetService } from "../pet/pet.service";
import { PurchaseService } from "../purchase/purchase.service";
import { Pet } from "../pet/pet.entity";
import { Purchase } from "../purchase/purchase.entity";

@Injectable()
export class UserService extends CrudService<User> {

    @Inject(ContactService)
    private readonly contactService: ContactService;

    @Inject(PetService)
    private readonly petService: PetService;

    @Inject(PurchaseService)
    private readonly purchaseService: PurchaseService;

    constructor(@InjectRepository(User) repository: Repository<User>) {
        super(repository);
    }

    // async create(data: CreateUserDTO): Promise<User> {
    //     const { name, email, password } = data;

    //     const user = new User();
    //     user.name = name;
    //     user.email = email;
    //     user.password = await bcrypt.hash(password, 10);

    //     return await this.createOne(user).catch((error) => {
    //         console.log('Error in user. repository', error.code);
    //         throw new InternalServerErrorException();
    //     });
    // }

    async validate(email: string, password: string) {
        const user: User = await this.findOne({ email: email });

        if (user && await bcrypt.compare(password, user.password)) {
            return {
                id: user.id,
                name: user.name,
                email: user.email
            }
        }
        return null
    }

    getPets(id: string): Promise<Pet[]> {
        return this.petService.getByOwner(id);
    }

    getPurchases(id: string): Promise<Purchase[]> {
        return this.purchaseService.getByOwner(id);
    }

    getContacts(id: string): Promise<Contact[]> {
        return this.contactService.getByOwner(id);
    }
}
