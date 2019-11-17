import { Body, Post, Param, Get, Patch, Delete } from "@nestjs/common";

import { DeepPartial } from "typeorm";

import { CrudService } from "./crud.service";

export class CrudController<T, TService extends CrudService<any>> {

    protected readonly service: TService;

    constructor(service: TService) { 
        this.service = service;
    }

    @Post()
    createOne(@Body() data: DeepPartial<T>) {
        return this.service.createOne(data);
    }

    @Post('bulk')
    bulkCreate(@Body() data: DeepPartial<T>[]) {
        return this.service.bulkCreate(data);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: string) {
        return this.service.findById(id);
    }

    @Patch(':id')
    updateOne(@Param('id') id: string, data: DeepPartial<T>) {
        return this.service.updateOne(id, data);
    }

    @Delete(':id')
    deleteOne(@Param('id') id: string) {
        return this.service.deleteOne(id);
    }

}
