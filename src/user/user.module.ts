import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from './user.entity';
import { UserService } from './user.service';
import { ContactModule } from '../contact/contact.module';
import { UserController } from './user.controller';
import { PetModule } from '../pet/pet.module';
import { PurchaseModule } from '../purchase/purchase.module';

@Module({
    imports: [TypeOrmModule.forFeature([User]), PetModule, PurchaseModule, ContactModule],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule { }
