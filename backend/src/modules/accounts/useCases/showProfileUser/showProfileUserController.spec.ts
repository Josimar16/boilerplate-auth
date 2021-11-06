import * as request from 'supertest';
import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { AppModule } from "../../../../app.module";

describe('ShowProfileUserController', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule]
    }).compile();
    app = moduleRef.createNestApplication();
    await app.init();
  })

  it('should be able show profile user', () => {
    return request(app.getHttpServer())
      .post('/users/profile')
      .expect(200)
  });
})