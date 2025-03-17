import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Product } from '../../products/models/product.model';
import { CustomerOrder } from './customer-order.model';

@Table({ tableName: 'customer_orders_products' })
export class CustomerOrderProduct extends Model {
  @ForeignKey(() => Product)
  @Column
  productId: number;

  @ForeignKey(() => CustomerOrder)
  @Column
  customerOrderId: number;

  @Column
  quantity: number;
}
