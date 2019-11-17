import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { Repository } from "typeorm";

import { CrudService } from "../lib/crud.service";
import { Service } from "./service.entity";

@Injectable()
export class ServiceService extends CrudService<Service> {

    constructor(@InjectRepository(Service) repository: Repository<Service>) {
        super(repository);
    }
}