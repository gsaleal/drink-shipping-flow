import {Injectable} from '@nestjs/common';
import {SendOrderInputDto} from '../dtos/send-order.dto';
import {Order} from '../../orders/models/orders.model';

@Injectable()
export class AdaptOrderServiceService {
    constructor() {}

    adaptOrder(order: Order): SendOrderInputDto {
        const productsMap = {} as Record<string, number>;


        for (const customerOrder of order.customerOrders) {
            for (const product of customerOrder.get().products) {
                const sku = product.get('sku');
                const qty = product['CustomerOrderProduct'].get('quantity');

                if (!productsMap[sku]) {
                    productsMap[sku] = qty;
                } else {
                    productsMap[sku] += qty;
                }
            }
        }

        return new SendOrderInputDto({
            orderId: order.id,
            storeId: order.storeId,
            totalItems: order.totalItems,
            totalPrice: order.totalPrice,
            products: Object.entries(productsMap).map(([sku, quantity]) => ({
                sku,
                quantity,
            })),
        });
    }
}
