import {Module} from '@nestjs/common';
import {SequelizeModule} from '@nestjs/sequelize';
import {CustomerOrderProduct} from './models/customer-order-products.model';
import {CustomerOrder} from './models/customer-order.model';
import {CustomerOrdersController} from './customer-orders.controller';
import {CreateCustomerOrderService} from './services/create.service';
import {ReadCustomerOrderService} from './services/read.service';
import {CustomerOrdersRepository} from './repositories/customer-orders.repository';
import {ProductsModule} from '../products/products.module';
import {ClientKafka, ClientsModule, Transport} from '@nestjs/microservices';
import { CustomersModule } from '../customers/customers.module';
import { StoresModule } from '../stores/stores.module';

@Module({
  imports: [
    SequelizeModule.forFeature([CustomerOrderProduct, CustomerOrder]),
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            brokers: ['kafka:9092'],
          },
        }
      },
    ]),
    ProductsModule,
    CustomersModule,
    StoresModule,
  ],
  controllers: [CustomerOrdersController],
  providers: [
    CustomerOrdersRepository,
    CreateCustomerOrderService,
    ReadCustomerOrderService,
    {
      provide: 'KAFKA_PRODUCER',
      useFactory: async (kafkaClient: ClientKafka) => {
        return kafkaClient.connect();
      },
      inject: ['KAFKA_SERVICE']
    }
  ],
  exports: [CustomerOrdersRepository],
})
export class CustomerOrdersModule {}
