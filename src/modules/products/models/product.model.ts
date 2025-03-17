import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { CustomerOrderProduct } from '../../customer-orders/models/customer-order-products.model';
import { CustomerOrder } from '../../customer-orders/models/customer-order.model';

@Table({ tableName: 'products' })
export class Product extends Model {

  
  @Column({
    unique: true,
  })
  sku: string;

  @Column
  name: string;

  @Column
  price: number;

  @BelongsToMany(() => CustomerOrder, () => CustomerOrderProduct)
  customerOrders: CustomerOrder[];
}
