import * as crypto from 'node:crypto';
import {Module} from '@nestjs/common';
import {ClientKafka, ClientsModule, Transport} from '@nestjs/microservices';
import {OrdersController} from './orders.controller';
import {AssignCustomerOrderToOrderService} from './services/assign-customer-order-to-order.service';
import {OrdersRepository} from './repositories/orders.repository';
import {CustomerOrdersModule} from '../customer-orders/customer-orders.module';
import {Order} from './models/orders.model';
import {SequelizeModule} from '@nestjs/sequelize';
import {SendOrderToPartnerService} from './services/send-order-to-partner.service';
import {PartnersModule} from '../partners/partners.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Order]),
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: `customer-order-consumer`,
            brokers: ['kafka:9092'],
          },
          consumer: {
            groupId: 'customer-order-consumer',
          }
        }
      },
    ]),
    CustomerOrdersModule,
    PartnersModule,
  ],
  controllers: [OrdersController],
  providers: [
    {
      provide: 'KAFKA_PRODUCER',
      useFactory: async (kafkaClient: ClientKafka) => {
        return kafkaClient.connect();
      },
      inject: ['KAFKA_SERVICE']
    },
    OrdersRepository,
    AssignCustomerOrderToOrderService,
    SendOrderToPartnerService,
  ],
  exports: [
    OrdersRepository,
  ],
})
export class OrdersModule {}
