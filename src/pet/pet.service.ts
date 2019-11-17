import { Injectable, Inject } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

import { CrudService } from "../lib/crud.service";
import { Pet } from "./pet.entity";
import { Purchase } from "../purchase/purchase.entity";
import { PurchaseService } from "../purchase/purchase.service";

@Injectable()
export class PetService extends CrudService<Pet> {

    @Inject(PurchaseService)
    private readonly purchaseService: PurchaseService;

    constructor(@InjectRepository(Pet) repository: Repository<Pet>) {
        super(repository);
    }

    getByOwner(id: string): Promise<Pet[]> {
        return this.find({
            owner: {
                id: id
            }
        })
    }

    async getPurchases(id: string): Promise<Purchase[]> {
        return await this.purchaseService.getByPet(id);
    }

}
