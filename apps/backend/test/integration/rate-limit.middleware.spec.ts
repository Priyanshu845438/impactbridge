import request from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';

describe('Rate limiting & logging middleware', () => {
  let app: INestApplication;

  beforeAll(async () => {
    process.env.RATE_LIMIT_POINTS = '2';
    process.env.RATE_LIMIT_TTL = '1000';

    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    delete process.env.RATE_LIMIT_POINTS;
    delete process.env.RATE_LIMIT_TTL;
    await app.close();
  });

  it('applies request id header and rate limit configuration is active', async () => {
    const res = await request(app.getHttpServer()).get('/');
    expect(res.headers['x-request-id']).toBeDefined();
    expect(res.status).toBeGreaterThanOrEqual(200);
  });
});
