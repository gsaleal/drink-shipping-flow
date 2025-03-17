import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { StoresRepository } from "../repositories/stores.repository";
import { ReadStoreResDto } from "../dtos/read-store.dto";

@Injectable()
export class ReadStoreService {
    constructor(
        private readonly storesRepository: StoresRepository
    ) {}

    async getAll(): Promise<Array<ReadStoreResDto>> {
        const stores = await this.storesRepository.getAll();
        return stores.map((store) => new ReadStoreResDto(store.get()));
    }

    async getById(id: number): Promise<ReadStoreResDto> {
        const store = await this.storesRepository.getById(id);
        if (!store) {
            throw new HttpException('Store not found', HttpStatus.NOT_FOUND);
        }
        return new ReadStoreResDto(store.get());
    }
}