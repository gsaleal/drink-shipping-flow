import {Producer} from 'kafkajs';
import {Inject, Injectable, Logger} from '@nestjs/common';
import {CustomerOrdersRepository} from '../../customer-orders/repositories/customer-orders.repository';
import {AssignCustomerOrderToOrderInputDto} from '../dtos/assign-customer-order-to-order.dto';
import {OrdersRepository} from '../repositories/orders.repository';

@Injectable()
export class AssignCustomerOrderToOrderService {
    private readonly logger = new Logger(AssignCustomerOrderToOrderService.name);

    constructor(
        @Inject('KAFKA_PRODUCER')
        private readonly kafkaProducer: Producer,
        private readonly ordersRepository: OrdersRepository,
        private readonly customerOrdersRepository: CustomerOrdersRepository,
    ) {}

    async handle(
        createdCustomerOrder: AssignCustomerOrderToOrderInputDto,
    ) {
        let order = await this.ordersRepository.findNotOrdered();

        if (!order) {
            this.logger.log(`No order found, creating new order for customer order ${createdCustomerOrder.id}`);
            order = await this.ordersRepository.create({
                storeId: createdCustomerOrder.storeId,
                totalItems: createdCustomerOrder.totalItems,
                totalPrice: createdCustomerOrder.totalPrice,
            });
        } else {
            this.logger.log(`Existing order found: ${order.id} attaching customer order ${createdCustomerOrder.id}`);
            order.set('totalItems', order.get('totalItems') + createdCustomerOrder.totalItems);
            order.set('totalPrice', order.get('totalPrice') + createdCustomerOrder.totalPrice);
        }

        const hasMoreThan1000Items = order.get('totalItems') >= 1000;
        order.set('orderedAt', hasMoreThan1000Items ? new Date() : null);
        await order.save();

        await this.customerOrdersRepository.updateById(
            createdCustomerOrder.id,
            {orderId: order.id},
        );

        if (hasMoreThan1000Items) {
            await this.publishOrderClosedEvent(order.id);
        }
    }

    async publishOrderClosedEvent(orderId: number) {
        this.logger.log(`Publishing order closed event for order ${orderId}`);

        await this.kafkaProducer.send({
            topic: 'order-closed',
            messages: [
                {
                    key: 'order-closed' + orderId,
                    value: JSON.stringify({orderId})
                },
            ],
        });
    }
}
