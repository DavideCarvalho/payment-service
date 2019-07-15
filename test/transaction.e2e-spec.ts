import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { INestApplication } from '@nestjs/common';

describe('PharmacyController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should add one more transaction into the database', () => {
    let size;
    return request(app.getHttpServer())
      .get('/transaction')
      .set({
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJuYW1lIjoiYWRtaW4iLCJpYXQiOjE1MTYyMzkwMjIsInJvbGVzIjpbIkdFVF9UUkFOU0FDVElPTlMiLCJHRVRfUEFZQUJMRVMiLCJDUkVBVEVfTkVXX1RSQU5TQUNUSU9OIl19.bvbqRAnrR19PiZ7wjM9s4s-tq1DQCceZTALBkspDMcA',
      })
      .expect(200)
      .then(response => {
        size = response.body.totalElements;
        return request(app.getHttpServer())
          .post('/transaction')
          .set({
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJuYW1lIjoiYWRtaW4iLCJpYXQiOjE1MTYyMzkwMjIsInJvbGVzIjpbIkdFVF9UUkFOU0FDVElPTlMiLCJHRVRfUEFZQUJMRVMiLCJDUkVBVEVfTkVXX1RSQU5TQUNUSU9OIl19.bvbqRAnrR19PiZ7wjM9s4s-tq1DQCceZTALBkspDMcA',
          })
          .send({
            transactionValue: 100,
            paymentMethod: 'DEBIT_CARD',
            cardNumber: '1579',
            cardHolder: 'teste2e',
            cardExpirationDate: 1589079600000,
            cvv: '825',
          })
          .expect(201)
          .then(() => {
            return request(app.getHttpServer())
              .get('/transaction')
              .set({
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJuYW1lIjoiYWRtaW4iLCJpYXQiOjE1MTYyMzkwMjIsInJvbGVzIjpbIkdFVF9UUkFOU0FDVElPTlMiLCJHRVRfUEFZQUJMRVMiLCJDUkVBVEVfTkVXX1RSQU5TQUNUSU9OIl19.bvbqRAnrR19PiZ7wjM9s4s-tq1DQCceZTALBkspDMcA',
              })
              .expect(200)
              .then(getResponse => {
                expect(getResponse.body.totalElements).toBe(size + 1);
              });
          });
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
