import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { CustomerOrder } from '../../customer-orders/models/customer-order.model';

@Table({tableName: 'stores'})
export class Store extends Model{
    @Column
    document: string;

    @Column
    socialName: string;
    
    @Column
    name: string;

    @Column({
        unique: true
    })
    email: string;

    @Column({ type: DataType.ARRAY(DataType.STRING) })
    phone: Array<string>;

    @Column({
        type: DataType.ARRAY(DataType.STRING)
    })
    representative: Array<string>;
    
    @Column({
        type: DataType.ARRAY(DataType.STRING)
    })
    address: Array<string>; //todo change 

    @HasMany(() => CustomerOrder)
    customerOrders: CustomerOrder[];
}