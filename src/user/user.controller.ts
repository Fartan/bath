import { Controller, Get, Param } from '@nestjs/common';

import { CrudController } from '../lib/crud.controller';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController extends CrudController<User, UserService> {

    constructor(service: UserService) {
        super(service);
    }

    // @Post('register')
    // async create(@Res() res, @Body() data: CreateUserDTO) {
    //     const user = await this.service.create(data);

    //     return res.status(HttpStatus.OK).json({
    //         message: 'User has been successfully created!',
    //         user: user,
    //     });
    // }

    @Get(':id/pets')
    getPets(@Param('id') id: string) {
        return this.service.getPets(id);
    }

    @Get(':id/purchases')
    getPurchases(@Param('id') id: string) {
        return this.service.getPurchases(id);
    }

    @Get(':id/contacts')
    getContacts(@Param('id') id: string) {
        return this.service.getContacts(id);
    }

    @Get()
    getUsers() {
        return this.findAll();
    }
}