import { Module } from '@nestjs/common';
import { ReadProductsService } from './services/read.service';
import { ProductsRepository } from './repositories/products.repository';
import { ProductsController } from './products.controller';
import { CreateProductsService } from './services/create.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './models/product.model';
import { DeleteProductService } from './services/delete.service';
import { UpdateProductService } from './services/update.service';

@Module({
  imports: [SequelizeModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [ProductsRepository, ReadProductsService, CreateProductsService, DeleteProductService, UpdateProductService],
  exports: [ProductsRepository],
})
export class ProductsModule {}
