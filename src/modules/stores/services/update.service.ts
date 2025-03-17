import { Injectable } from "@nestjs/common";
import { StoresRepository } from "../repositories/stores.repository";

@Injectable()
export class UpdateStoreService {
    constructor(
        private readonly storesRepository: StoresRepository
    ) {}

    async update(id: number, payload: any): Promise<void> {
        await this.storesRepository.updateById(id, payload);
    }
}