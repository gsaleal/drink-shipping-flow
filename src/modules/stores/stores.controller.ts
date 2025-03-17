import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from "@nestjs/common";
import { CreateStoreService } from "./services/create.service";
import { ReadStoreService } from "./services/read.service";
import { CreateStoreReqDto, CreateStoreResDto } from "./dtos/create-store.dto";
import { ReadStoreResDto } from "./dtos/read-store.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { DeleteStoreService } from "./services/delete.service";
import { UpdateStoreService } from "./services/update.service";

@Controller("stores")
export class StoreController {
    constructor(
        private readonly createStoreService: CreateStoreService,
        private readonly readStoreService: ReadStoreService,
        private readonly updateStoreService: UpdateStoreService,
        private readonly deleteStoreService: DeleteStoreService
    ) {}

    @ApiOperation({ summary: 'Create a new store'})
    @ApiResponse({
        status: 201,
        description: 'Store created',
        type: CreateStoreResDto,
    })
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createStore(@Body() payload: CreateStoreReqDto): Promise<CreateStoreResDto> {
        return await this.createStoreService.create(payload);
    }

    @ApiOperation({ summary: 'Get all stores'})
    @ApiResponse({
        status: 200,
        type: ReadStoreResDto,
        isArray: true
    })
    @Get()
    @HttpCode(HttpStatus.OK)
    async getAllStores(): Promise<Array<ReadStoreResDto>> {
        return await this.readStoreService.getAll();
    }

    @ApiOperation({ summary: 'Get store by id'})
    @ApiResponse({
        status: 200,
        type: ReadStoreResDto,
    })
    @Get(":id")
    @HttpCode(HttpStatus.OK)
    async getStoreById(@Param('id') id: number): Promise<ReadStoreResDto> {
        return await this.readStoreService.getById(id);
    }


    @ApiOperation({ summary: 'Update store by id'})
    @ApiResponse({
        status: 204,
    })
    @Put(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    async updateStore(@Param('id') id: number, @Body() payload: any): Promise<void> {
        return await this.updateStoreService.update(id, payload);
    }

    @Delete(":id")
    @HttpCode(HttpStatus.NO_CONTENT)
    async deleteStore(@Param('id') id: number): Promise<void> {
        return await this.deleteStoreService.delete(id);
    }

}