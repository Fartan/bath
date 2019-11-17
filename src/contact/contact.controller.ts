import { Controller } from "@nestjs/common";

import { CrudController } from "../lib/crud.controller";
import { Contact } from "./contact.entity";
import { ContactService } from "./contact.service";

@Controller('contacts')
export class ContactController extends CrudController<Contact, ContactService> {

    constructor(service: ContactService) {
        super(service);
    }
}
