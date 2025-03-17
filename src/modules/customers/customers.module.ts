import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { Customer } from "./models/customer.model";
import { CustomerController } from "./customers.controller";
import { CustomersRepository } from "./repositories/customers.repository";
import { CreateCustomerService } from "./services/create.service";
import { ReadCustomersService } from "./services/read.service";
import { DeleteCustomerService } from "./services/delete.service";


@Module({
    imports: [SequelizeModule.forFeature([Customer])],
    controllers: [CustomerController],
    providers: [CustomersRepository, CreateCustomerService, ReadCustomersService, DeleteCustomerService],
    exports: [CustomersRepository],
})
export class CustomersModule {}