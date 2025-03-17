import { Injectable } from "@nestjs/common";
import { CustomersRepository } from "../repositories/customers.repository";

@Injectable()
export class DeleteCustomerService {
    constructor(
        private readonly customerRepository: CustomersRepository,
    ) {}
    
    async delete(id: number): Promise<void> {
        await this.customerRepository.delete(id);
    }
}