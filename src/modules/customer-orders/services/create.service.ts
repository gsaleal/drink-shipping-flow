import {HttpException, HttpStatus, Inject, Injectable, Logger} from '@nestjs/common';
import {ClientKafka} from '@nestjs/microservices';
import {ProductsRepository} from '../../products/repositories/products.repository';
import {
  CreateCustomerOrderReqDto,
  CreateCustomerOrderResDto,
} from '../dtos/create-customer-order.dto';
import {CustomerOrdersRepository} from '../repositories/customer-orders.repository';
import {Producer} from 'kafkajs';
import {Product} from '../../products/models/product.model';

@Injectable()
export class CreateCustomerOrderService {
  private readonly logger = new Logger(CreateCustomerOrderService.name);

  constructor(
    @Inject('KAFKA_PRODUCER')
    private readonly kafkaProducer: Producer,
    private readonly customerOrdersRepository: CustomerOrdersRepository,
    private readonly productsRepository: ProductsRepository,
  ) {}

  async create(
    storeId: number,
    customerId: number,
    createCustomerOrderReqDto: CreateCustomerOrderReqDto,
  ): Promise<CreateCustomerOrderResDto> {
    const products = await this.productsRepository.getByIds(
      createCustomerOrderReqDto.products.map((product) => product.id),
    );

    if (!products.length) {
      throw new HttpException('No products were found for this order', HttpStatus.NOT_FOUND);
    }

    const eventProducts = [] as Array<Product>;
    let totalPrice = 0;
    let totalItems = 0;

    for (const product of createCustomerOrderReqDto.products) {
      const persistedProduct = products.find((p) => p.id === product.id);

      if (!persistedProduct) {
        throw new HttpException(`Product with id ${product.id} not found`, HttpStatus.NOT_FOUND);
      }

      totalItems += product.quantity;
      totalPrice += persistedProduct.get().price * product.quantity;

      eventProducts.push({
        ...persistedProduct.get(),
        quantity: product.quantity
      });
    }

    const createdCustomerOrder = await this.customerOrdersRepository.createOne({
      storeId,
      customerId,
      totalItems,
      totalPrice,
      products: createCustomerOrderReqDto.products,
    });

    this.logger.log(`Customer order created: ${createdCustomerOrder.id}`);

    await this.publishOrderCreatedEvent({
      ...createdCustomerOrder.get(),
      products: eventProducts,
    });

    const customerOrderResp = new CreateCustomerOrderResDto(createdCustomerOrder.get());
    customerOrderResp.products = products;

    return customerOrderResp;
  }

  async publishOrderCreatedEvent(payload: CreateCustomerOrderResDto) {
    this.logger.log(`Publishing customer order created event: ${payload.id}`);

    await this.kafkaProducer.send({
      topic: 'customer-order-created',
      messages: [
        {
          key: 'customer-order-created' + payload.id,
          value: JSON.stringify(payload),
        },
      ],
    });
  }
}
