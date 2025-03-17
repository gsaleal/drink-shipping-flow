import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CustomerOrdersRepository } from '../repositories/customer-orders.repository';
import { ReadCustomerOrderResDto } from '../dtos/read-customer-order.dto';

@Injectable()
export class ReadCustomerOrderService {
  constructor(
    private readonly customerOrdersRepository: CustomerOrdersRepository,
  ) {}

  async getById(
    storeId: number,
    customerId: number,
    customerOrderId: number,
  ): Promise<ReadCustomerOrderResDto> {
    const customerOrder = await this.customerOrdersRepository.getOne({
      id: customerOrderId,
      storeId,
      customerId,
    });

    if (!customerOrder) {
      throw new HttpException('Customer Order not found', HttpStatus.NOT_FOUND);
    }

    const co = customerOrder.get();

    return new ReadCustomerOrderResDto({
      id: co.id,
      storeId: co.storeId,
      customerId: co.customerId,
      totalItems: co.totalItems,
      totalPrice: co.totalPrice,
      products: co.products.map((product) => {
        const p = product.get();
        return {
          id: p.id,
          sku: p.sku,
          name: p.name,
          price: p.price,
          quantity: p['CustomerOrderProduct'].get().quantity,
        };
      }),
    } as ReadCustomerOrderResDto);
  }

  async getAll(
    storeId: number,
    customerId: number,
  ): Promise<Array<ReadCustomerOrderResDto>> {
    const customerOrders = await this.customerOrdersRepository.getAll({
      storeId,
      customerId,
    });

    return customerOrders.map((customerOrder) => {
      const co = customerOrder.get();

      return new ReadCustomerOrderResDto({
        id: co.id,
        storeId: co.storeId,
        customerId: co.customerId,
        totalItems: co.totalItems,
        totalPrice: co.totalPrice,
        products: co.products.map((product) => {
          const p = product.get();
          return {
            id: p.id,
            sku: p.sku,
            name: p.name,
            price: p.price,
            quantity: p['CustomerOrderProduct'].get().quantity,
          };
        }),
      } as ReadCustomerOrderResDto);
    });
  }
}
