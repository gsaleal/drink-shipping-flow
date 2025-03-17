import { Test, TestingModule } from '@nestjs/testing';
import { CustomerController } from './customers.controller';
import { CreateCustomerService } from './services/create.service';
import { INestApplication } from '@nestjs/common';
import { CustomersModule } from './customers.module';
import * as request from 'supertest';
import { ReadCustomerResDto } from './dtos/read-customer.dto';

describe('Customers controllers', () => {
    let app: INestApplication;
    let createCustomerService = { findAll: () => new Array<ReadCustomerResDto> };
    let customerController: CustomerController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
        controllers: [CustomerController],
        providers: [CreateCustomerService],
        }).compile();

        customerController = app.get<CustomerController>(CustomerController);
    });

    describe('Create', () => {
        beforeAll(async () => {
            const moduleRef = await Test.createTestingModule({
                imports: [CustomersModule],
              })
              .overrideProvider(CreateCustomerService)
              .useValue(createCustomerService)
              .compile();
    
            app = moduleRef.createNestApplication();
            await app.init();
        });

        it('should return test', () => {
        return request(app.getHttpServer())
            .get('/customers')
            .expect(200)
            .expect({
                data: createCustomerService.findAll(),
            });
        });
    });
});
