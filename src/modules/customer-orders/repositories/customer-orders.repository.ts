import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {CustomerOrder} from '../models/customer-order.model';
import {Product} from '../../products/models/product.model';
import {CustomerOrderProduct} from '../models/customer-order-products.model';
import {Sequelize} from 'sequelize-typescript';

@Injectable()
export class CustomerOrdersRepository {
  constructor(
    @InjectModel(CustomerOrder)
    private customerOrderModel: typeof CustomerOrder,
    @InjectModel(CustomerOrderProduct)
    private customerOrderProductModel: typeof CustomerOrder,
  ) {}

  async createOne(payload: {
    storeId: number;
    customerId: number;
    totalItems: number;
    totalPrice: number;
    products: Array<{id: number; quantity: number;}>;
  }) {
    const createdCustomerOrder = await this.customerOrderModel.create({
      ...payload,
    });

    await this.customerOrderProductModel.bulkCreate(
      payload.products.map((product) => ({
        productId: product.id,
        quantity: product.quantity,
        customerOrderId: createdCustomerOrder.id,
      })),
    );

    return createdCustomerOrder;
  }

  async getOne(where): Promise<CustomerOrder | null> {
    return this.customerOrderModel.findOne({where, include: [Product]});
  }

  async getAll(where): Promise<Array<CustomerOrder>> {
    return this.customerOrderModel.findAll({where, include: [Product]});
  }

  async updateById(id: number, payload: Partial<CustomerOrder>): Promise<void> {
    await this.customerOrderModel.update(payload, {where: {id}});
  }
}
