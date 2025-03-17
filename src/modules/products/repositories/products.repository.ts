import { Injectable } from '@nestjs/common';
import { Product } from '../models/product.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProductReqDto } from '../dtos/create-product.dto';

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
  ) {}

  async getById(id: number): Promise<Product | null> {
    return this.productModel.findByPk(id);
  }

  async getByIds(ids: Array<number>): Promise<Array<Product>> {
    return this.productModel.findAll({
      where: {
        id: ids,
      },
    });
  }

  async getAll(): Promise<Array<Product>> {
    return this.productModel.findAll();
  }

  async createOne(payload: CreateProductReqDto): Promise<Product> {
    const createdProduct = await this.productModel.create({
      ...payload,
    });

    return createdProduct;
  }

  async updateById(id: number, payload: any): Promise<void> {
    await this.productModel.update(payload, {where: {id}});
  }

  async deleteById(id: number): Promise<void> {
    await this.productModel.destroy({where: {id}});
  }
}
