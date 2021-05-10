import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';
import { mongoose } from '@typegoose/typegoose';
import { AuthDto } from '../src/modules/auth/dto/auth.dto';
import { REVIEW_NOT_FOUND } from '../src/modules/review/review.contstants';
import {
  USER_NOT_FOUND_ERROR,
  WRONG_PASSWORD_ERROR,
} from '../src/modules/auth/auth.constants';

const loginDtoSuccess: AuthDto = {
  login: 'a8@gma.ru',
  password: 'qwerty',
};

const loginDtoPasswordError: AuthDto = {
  login: 'a8@gma.ru',
  password: 'qwert',
};

const loginDtoEmaildError: AuthDto = {
  login: 'a0@gma.ru',
  password: 'qwerty',
};

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let token: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/auth/login (POST) - success', async (done) => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDtoSuccess)
      .expect(200)
      .then(({ body }: request.Response) => {
        token = body.access_token;
        expect(token).toBeDefined();
        done();
      });
  });

  it('/auth/login (POST) - failed (Incorrect password)', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDtoPasswordError)
      .expect(401, {
        statusCode: 401,
        message: WRONG_PASSWORD_ERROR,
        error: 'Unauthorized',
      });
  });

  it('/auth/login (POST) - failed (Incorrect email)', async () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send(loginDtoEmaildError)
      .expect(401, {
        statusCode: 401,
        message: USER_NOT_FOUND_ERROR,
        error: 'Unauthorized',
      });
  });

  afterAll(() => {
    mongoose.disconnect();
  });
});
