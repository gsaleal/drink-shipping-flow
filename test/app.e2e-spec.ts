import {Test, TestingModule} from '@nestjs/testing';
import {INestApplication} from '@nestjs/common';
import * as request from 'supertest';
import {App} from 'supertest/types';
import {AppModule} from './../src/app.module';
import { ProductsModule } from '../src/modules/products/products.module';

describe('E2E', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, ProductsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Should create stores, return 200', () => {
    request(app.getHttpServer())
      .post('/api/stores')
      .send({
        document: '63627875000238',
        name: 'Store 1 LTDA',
        socialName: 'Store 1',
        email: 'store2@email.com',
        phone: ['11999999999'],
        representative: ['John Doe'],
        address: ['Rua 1, 123, Bairro 1, Cidade 1, SP']
      })
      .expect(200)
      .expect(({body}) => {
        expect(body).toHaveLength(1);
      });

  });

  it('Should create products, return 200', () => {
    request(app.getHttpServer())
      .post('/api/products')
      .send({
        name: "Cerveja skol 350ml",
        sku: "7891991295053",
        price: 7500
      })
      .expect(200)
      .expect(({body}) => {
        expect(body).toHaveLength(1);
      });

  });

  it('Should create Customer, return 200', () => {
    request(app.getHttpServer())
      .post('/api/customers')
      .send({
        "products": [
          {
            "id": 1,
            "quantity": 5000
          }
        ]
      })
      .expect(200)
      .expect(({body}) => {
        expect(body).toHaveLength(1);
      });

  });

  it('Should create Customer-order, achieve 1000 items and send to Partner', () => {
    request(app.getHttpServer())
      .post('/api/customer-orders/1/orders')
      .send({
        "products": [
          {
              "id": 1,
              "quantity": 5000
          }
        ]
      })
      .expect(200)
      .expect(({body}) => {
      expect(body).toHaveLength(1);
    });

  });



});