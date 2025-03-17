import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CustomersRepository } from '../repositories/customers.repository';
import { ReadCustomerResDto } from '../dtos/read-customer.dto';

@Injectable()
export class ReadCustomersService {
  constructor(private readonly customerRepository: CustomersRepository) {}

  async getById(id: number): Promise<ReadCustomerResDto> {
    const customer = await this.customerRepository.getById(id);

    if (!customer) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    } 

    return new ReadCustomerResDto(customer.get());
  }

  async getAll(): Promise<Array<ReadCustomerResDto>> {
    const customers = await this.customerRepository.getAll();

    return customers.map((customer) => new ReadCustomerResDto(customer.get()));
  }
}
