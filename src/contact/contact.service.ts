import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { CrudService } from '../lib/crud.service';
import { Contact } from './contact.entity';

@Injectable()
export class ContactService extends CrudService<Contact> {

    constructor(@InjectRepository(Contact) repository: Repository<Contact>) {
        super(repository);
    }

    getByOwner(id: string): Promise<Contact[]> {
        return this.find({
            owner: {
                id: id
            }
        });
    }
}
