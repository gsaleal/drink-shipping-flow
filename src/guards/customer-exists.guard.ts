import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { CustomersRepository } from '../modules/customers/repositories/customers.repository';

@Injectable()
export class CustomerExistsGuard implements CanActivate {
    constructor(
        private readonly customersRepository: CustomersRepository,
    ) { }

    async canActivate(
        context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const { customerId } = request.params;
        const customer = await this.customersRepository.getById(customerId);

        if (!customer) {
            throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
        }

        return true;
    }
}