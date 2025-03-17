import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { CustomerOrder } from './../../customer-orders/models/customer-order.model';

@Table({ tableName: 'customers' })
export class Customer extends Model {
  @Column
  document: string;

  @Column
  name: string;

  @Column
  socialName: string;

  @HasMany(() => CustomerOrder)
  customerOrders: CustomerOrder[];
}
