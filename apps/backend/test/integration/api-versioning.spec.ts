import request from 'supertest';
import { Test } from '@nestjs/testing';
import type { INestApplication } from '@nestjs/common';
import { AppModule } from '../../src/app.module';

describe('API versioning enforcement', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('does not expose apis without id parameter', async () => {
    const res = await request(app.getHttpServer()).get(
      '/api/v1/campaigns/public',
    );
    expect(res.status).toBe(404);
  });

  it('rejects access to unversioned route', async () => {
    const res = await request(app.getHttpServer()).get('/');
    expect(res.status).toBe(404);
  });
});
