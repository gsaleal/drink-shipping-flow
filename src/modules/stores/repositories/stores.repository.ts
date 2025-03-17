import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { Store } from "../models/store.model";
import { CreateStoreReqDto } from "../dtos/create-store.dto";

@Injectable()
export class StoresRepository {
    constructor(
        @InjectModel(Store) 
        private storeModel: typeof Store
    ) {}

    async createOne(payload: CreateStoreReqDto): Promise<Store> {
        return this.storeModel.create({...payload});
    }
    
    async getAll(): Promise<Array<Store>> {
        return this.storeModel.findAll();
    }

    async getById(id: number): Promise<Store | null> {
        return this.storeModel.findByPk(id);
    }

    async getByEmail(email: string): Promise<Store | null> {
        return this.storeModel.findOne({where: {email}});
    }

    async updateById(id: number, payload: any): Promise<void> {
        await this.storeModel.update(payload, {where: {id}});
    }

    async deleteById(id: number): Promise<void> {
        await this.storeModel.destroy({where: {id}});
    }
}