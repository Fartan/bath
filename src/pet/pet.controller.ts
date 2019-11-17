import { Controller, Get, Param } from "@nestjs/common";

import { CrudController } from "../lib/crud.controller";
import { Pet } from "./pet.entity";
import { PetService } from "./pet.service";

@Controller('pets')
export class PetController extends CrudController<Pet, PetService> {

    constructor(service: PetService) {
        super(service);
    }

    @Get(':id/purchases')
    getPurchases(@Param('id') id: string) {
        return this.service.getPurchases(id);
    }
}