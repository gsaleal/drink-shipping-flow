import {BelongsToMany, BelongsTo, Column, ForeignKey, Model, Table} from 'sequelize-typescript';
import {Product} from '../../products/models/product.model';
import {CustomerOrderProduct} from './customer-order-products.model';
import {Customer} from '../../customers/models/customer.model';
import {Order} from '../../orders/models/orders.model';
import {Store} from '../../stores/models/store.model';
import {ApiProperty} from '@nestjs/swagger';

@Table({tableName: 'customer_orders'})
export class CustomerOrder extends Model {
  @ForeignKey(() => Store)
  @Column
  storeId: number;

  @ForeignKey(() => Customer)
  @Column
  customerId: number;

  @Column
  totalPrice: number;

  @Column
  totalItems: number;

  @ForeignKey(() => Order)
  @Column
  orderId: number;

  @ApiProperty({type: () => Product, isArray: true})
  @BelongsToMany(() => Product, () => CustomerOrderProduct)
  products: Product[];
}
