import {Injectable} from '@nestjs/common';
import {CustomersRepository} from '../repositories/customers.repository';
import { CreateCustomerReqDto, CreateCustomerResDto } from '../dtos/create-customer.dto';

@Injectable()
export class CreateCustomerService {
  constructor(
    private readonly customerRepository: CustomersRepository,
  ) {}

  async create(payload: CreateCustomerReqDto): Promise<CreateCustomerResDto> {
    const customer = await this.customerRepository.create(payload);
    return new CreateCustomerResDto(customer.get());
  }
}
