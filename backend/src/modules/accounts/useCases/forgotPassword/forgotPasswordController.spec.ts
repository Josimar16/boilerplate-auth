import * as request from 'supertest';
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AppModule } from "../../../../app.module";

describe('ForgotPasswordController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  })

  it('should be able recover the password using the email', () => {
    return request(app.getHttpServer())
      .post('/password')
      .send({
        email: 'john.joedue@example.com'
      })
      .expect(204)
  });


  it('should not be able recover the password, because the email is invalid', () => {
    return request(app.getHttpServer())
      .post('/password')
      .send({
        email: 'john@mailcom'
      })
      .expect(400)
  });

  it('should not be able to recover a non-existing user password', () => {
    return request(app.getHttpServer())
      .post('/password')
      .send({
        email: 'john@mail.com'
      })
      .expect(404)
  });
})