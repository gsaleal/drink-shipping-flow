import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ProductsRepository } from '../repositories/products.repository';
import { ReadProductResDto } from '../dtos/read-product.dto';

@Injectable()
export class ReadProductsService {
  constructor(private readonly productsRepository: ProductsRepository) {}

  async getById(id: number): Promise<ReadProductResDto> {
    const product = await this.productsRepository.getById(id);

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    return new ReadProductResDto(product.get());
  }

  async getAll(): Promise<Array<ReadProductResDto>> {
    const products = await this.productsRepository.getAll();

    return products.map((product) => new ReadProductResDto(product.get()));
  }
}
