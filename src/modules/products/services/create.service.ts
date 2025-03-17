import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductsRepository } from '../repositories/products.repository';
import {
  CreateProductReqDto,
  CreateProductResDto,
} from '../dtos/create-product.dto';

@Injectable()
export class CreateProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async create(payload: CreateProductReqDto): Promise<CreateProductResDto> {
    const hasSku = await this.productsRepository.getBySku(payload.sku);
    if(hasSku) {
      throw new HttpException('Sku already exists', HttpStatus.BAD_REQUEST);
    }
    const product = await this.productsRepository.createOne(payload);
    return new CreateProductResDto(product.get());
  }
}
