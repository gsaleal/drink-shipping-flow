import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ReadProductsService } from './services/read.service';
import {
  CreateProductReqDto,
  CreateProductResDto,
} from './dtos/create-product.dto';
import { CreateProductsService } from './services/create.service';
import { ReadProductResDto } from './dtos/read-product.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller("products")
export class ProductsController {
  constructor(
    private readonly readProductsService: ReadProductsService,
    private readonly createProductsService: CreateProductsService,
  ) {}

  @ApiOperation({ summary: 'Create a new product'})
  @ApiResponse({
      status: 201,
      description: 'Product created',
      type: CreateProductReqDto,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createProduct(
    @Body() createProductDto: CreateProductReqDto,
  ): Promise<CreateProductResDto> {
    return this.createProductsService.create(createProductDto);
  }

  @ApiOperation({ summary: 'Get a product by id'})
  @ApiResponse({
      status: 200,
      description: 'Product found',
      type: ReadProductResDto,
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getProductById(@Param('id') id: number): Promise<ReadProductResDto> {
    return this.readProductsService.getById(id);
  }

  @ApiOperation({ summary: 'Get all products'})
  @ApiResponse({
      status: 200,
      description: 'Products found',
      type: ReadProductResDto,
      isArray: true
  })
  @Get()
  @HttpCode(HttpStatus.OK)
  async getProducts(): Promise<Array<ReadProductResDto>> {
    return this.readProductsService.getAll();
  }

}
