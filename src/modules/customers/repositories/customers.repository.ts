import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Customer } from '../models/customer.model';
import { CreateCustomerReqDto } from '../dtos/create-customer.dto';

@Injectable()
export class CustomersRepository {
  constructor(
    @InjectModel(Customer)
    private customerModel: typeof Customer,
  ) {}

  async create(payload: CreateCustomerReqDto): Promise<Customer> {
    return this.customerModel.create({ ...payload });
  }

  async delete(id: number): Promise<void> {
    await this.customerModel.destroy({ where: { id } });
  }

  async getAll(): Promise<Array<Customer>> {
    return this.customerModel.findAll();
  }

  async getById(id: number): Promise<Customer | null> {
    return this.customerModel.findByPk(id);
  }

}
