import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {ProductsModule} from './modules/products/products.module';
import {CustomerOrdersModule} from './modules/customer-orders/customer-orders.module';
import {SequelizeModule} from '@nestjs/sequelize';
import {OrdersModule} from './modules/orders/orders.module';
import {PartnersModule} from './modules/partners/partners.module';
import { CustomersModule } from './modules/customers/customers.module';
import { StoresModule } from './modules/stores/stores.module';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      autoLoadModels: true,
      synchronize: true,
    }),
    ProductsModule,
    CustomerOrdersModule,
    OrdersModule,
    PartnersModule,
    CustomersModule,
    StoresModule,
  ],
})
export class AppModule {}
