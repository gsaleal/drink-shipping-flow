import { Injectable } from "@nestjs/common";
import { StoresRepository } from "../repositories/stores.repository";

@Injectable()
export class DeleteStoreService {
    constructor(
        private readonly storesRepository: StoresRepository
    ) {}

    async delete(id: number): Promise<void> {
        await this.storesRepository.deleteById(id);
    }
}