import { Controller } from "@nestjs/common";

import { CrudController } from "../lib/crud.controller";
import { Purchase } from "./purchase.entity";
import { PurchaseService } from "./purchase.service";

@Controller('purchases')
export class PurchaseController extends CrudController<Purchase, PurchaseService> {

    constructor(service: PurchaseService) {
        super(service);
    }
}
