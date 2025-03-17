import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateStoreReqDto, CreateStoreResDto } from "../dtos/create-store.dto";
import { StoresRepository } from "../repositories/stores.repository";

@Injectable()
export class CreateStoreService {
    constructor(
        private readonly storesRepository: StoresRepository,
    ) {}

    async create(payload: CreateStoreReqDto): Promise<CreateStoreResDto> {

        const hasEmail = await this.storesRepository.getByEmail(payload.email);
        if(hasEmail) {
            throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
        }
        const store = await this.storesRepository.createOne(payload);
        return new CreateStoreResDto(store.get());
    }
}