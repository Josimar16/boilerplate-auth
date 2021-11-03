import * as request from 'supertest';
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AppModule } from "../../../../app.module";

describe('CreateUserController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  })

  it('should be able create a new user', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'John Due',
        email: 'john.joedue@example.com'
      })
      .expect(201)
  });


  it('should not be able create a new user, because email is invalid', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        name: 'John Due',
        email: 'john@mailcom'
      })
      .expect(400)
  });
})