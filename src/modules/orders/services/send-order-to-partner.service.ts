import {Injectable, Logger} from '@nestjs/common';
import {HeinekenRepository} from '../../partners/repositories/external.repository';
import {AdaptOrderServiceService} from '../../partners/services/adapt-order-service.service';
import {sendOrderToPartnerInputDto} from '../dtos/send-order-to-partner.dto';
import {OrdersRepository} from '../repositories/orders.repository';

@Injectable()
export class SendOrderToPartnerService {
    private readonly logger = new Logger(SendOrderToPartnerService.name);

    constructor(
        private readonly ordersRepository: OrdersRepository,
        private readonly externalRepository: HeinekenRepository,
        private readonly adaptOrderServiceService: AdaptOrderServiceService,
    ) {}

    async handle({orderId}: sendOrderToPartnerInputDto): Promise<void> {
        const order = await this.ordersRepository.findWithCustomerOrders(orderId);

        if (!order) {
            this.logger.warn(`Order ${orderId} not found. Unable to send to partner`);
            return;
        }

        const adaptedOrder = this.adaptOrderServiceService.adaptOrder(order.get());
        const partnerOrderId = await this.externalRepository.sendOrder(adaptedOrder);

        await this.ordersRepository.updateById(orderId, {partnerOrderId});
        this.logger.log(`Order ${orderId} sent to partner: ${partnerOrderId}`);
    }
}
