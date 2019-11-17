import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

import { CrudService } from "../lib/crud.service";
import { Purchase } from "./purchase.entity";

@Injectable()
export class PurchaseService extends CrudService<Purchase> {

    constructor(@InjectRepository(Purchase) repository: Repository<Purchase>) {
        super(repository);
    }

    getByOwner(id: string): Promise<Purchase[]> {
        return this.find({
            owner: {
                id: id
            }
        })
    }

    getByPet(id: string): Promise<Purchase[]> {
        return this.find({
            pet: {
                id: id
            }
        })
    }
}