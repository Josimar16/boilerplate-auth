import * as request from 'supertest';
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AppModule } from "../../../../app.module";

describe('AuthenticateUserController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  })

  it('should be able authenticate a user', () => {
    return request(app.getHttpServer())
      .post('/sessions')
      .send({
        email: 'john.joedue@example.com',
        password: '123456'
      })
      .expect(200)
  });


  it('should not be able create a new user, because the entities are bad formatted', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        email: 'john@mailcom',
        password: '12345'
      })
      .expect(400)
  });
})