import { Controller } from "@nestjs/common";

import { CrudController } from "../lib/crud.controller";
import { Service } from "./service.entity";
import { ServiceService } from "./service.service";

@Controller('services')
export class ServiceController extends CrudController<Service, ServiceService> {

    constructor(service: ServiceService) {
        super(service);
    }
}
