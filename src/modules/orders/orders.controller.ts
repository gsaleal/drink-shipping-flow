import {Controller} from '@nestjs/common';
import {MessagePattern, Payload} from '@nestjs/microservices';
import {KafkaMessage} from 'kafkajs';
import {AssignCustomerOrderToOrderService} from './services/assign-customer-order-to-order.service';
import {AssignCustomerOrderToOrderInputDto} from './dtos/assign-customer-order-to-order.dto';
import {SendOrderToPartnerService} from './services/send-order-to-partner.service';
import {sendOrderToPartnerInputDto} from './dtos/send-order-to-partner.dto';

@Controller()
export class OrdersController {
  constructor(
    private readonly assignCustomerOrderToOrder: AssignCustomerOrderToOrderService,
    private readonly sendOrderToPartnerService: SendOrderToPartnerService,
  ) {}


  @MessagePattern('customer-order-created')
  async handleCustomerOrderCreated(
    @Payload() message: AssignCustomerOrderToOrderInputDto,
  ) {
    return this.assignCustomerOrderToOrder.handle(new AssignCustomerOrderToOrderInputDto(
      message,
    ));
  }

  @MessagePattern('order-closed')
  async handleOrderClosed(
    @Payload() message: sendOrderToPartnerInputDto,
  ) {
    return this.sendOrderToPartnerService.handle(message);
  }
}
