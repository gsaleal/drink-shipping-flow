import {Column, HasMany, Model, Table, DataType} from 'sequelize-typescript';
import {CustomerOrder} from '../../customer-orders/models/customer-order.model';

@Table({tableName: 'orders'})
export class Order extends Model {
  @Column
  storeId: number;

  @Column
  totalPrice: number;

  @Column
  totalItems: number;

  @Column(DataType.DATE)
  orderedAt: Date | null;

  @Column(DataType.STRING)
  partnerOrderId: string | null;

  @HasMany(() => CustomerOrder)
  customerOrders: Array<CustomerOrder>;
}
