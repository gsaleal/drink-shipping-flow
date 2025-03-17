import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/sequelize';
import {Order} from '../models/orders.model';
import {CustomerOrder} from '../../customer-orders/models/customer-order.model';
import {Product} from '../../products/models/product.model';

@Injectable()
export class OrdersRepository {
    constructor(
        @InjectModel(Order)
        private orderModel: typeof Order,
    ) {}

    async findNotOrdered() {
        return this.orderModel.findOne({
            where: {
                orderedAt: null,
            },
        });
    }

    async findWithCustomerOrders(id: number): Promise<Order | null> {
        return this.orderModel.findOne({
            where: {id},
            include: [{
                model: CustomerOrder,
                include: [{
                    model: Product,
                }],
            }],
        });
    }

    async create(payload: Partial<Order>): Promise<Order> {
        return this.orderModel.create({...payload});
    }

    async updateById(id: number, payload: Partial<Order>): Promise<void> {
        await this.orderModel.update(payload, {where: {id}});
    }
}
