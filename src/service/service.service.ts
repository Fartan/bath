import { Injectable } from "@nestjs/common";
import { CrudService } from "../lib/crud.service";
import { Service } from "./service.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class ServiceService extends CrudService<Service> {

    constructor(@InjectRepository(Service) repository: Repository<Service>) {
        super(repository);
    }
}