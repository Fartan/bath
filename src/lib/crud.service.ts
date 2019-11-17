import { Repository, FindManyOptions, DeepPartial } from "typeorm";

export abstract class CrudService<T, TID=string> {

    protected readonly repository: Repository<T>;

    constructor(repository: Repository<T>) {
        this.repository = repository;
    }

    findById(id: TID) : Promise<T> {
        return this.repository.findOne(id);
    }

    find(conditions?: object): Promise<T[]> {
        return this.repository.find(conditions);
    }

    findOne(options: object): Promise<T> {
        return this.repository.findOne(options);
    }

    findAll(filter?: FindManyOptions) : Promise<T[]> {
        return this.repository.find(filter);
    }

    updateOne<DTO = DeepPartial<T>>(id: TID, data: DTO) : Promise<T> {
        return this.repository.save({
            id: id,
            ...data
        });
    }

    async deleteOne(id: TID) : Promise<void> {
        await this.repository.delete(id);
    }

    createOne<DTO = DeepPartial<T>>(data: DTO) : Promise<T> {
        return this.repository.save(data);
    }

    bulkCreate<DTO = DeepPartial<T>[]>(data: DTO[]) : Promise<T[]> {
        return this.repository.save(data);
    }
}
