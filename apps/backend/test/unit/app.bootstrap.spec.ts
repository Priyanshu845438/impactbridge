import { INestApplication } from '@nestjs/common';
import { createTestingApp } from './testing-app';

describe('App bootstrap smoke test', () => {
  let app: INestApplication;

  beforeAll(async () => {
    app = await createTestingApp();
  });

  afterAll(async () => {
    await app.close();
  });

  it('starts without running migrations', () => {
    expect(app).toBeDefined();
    expect(app.getHttpServer()).toBeDefined();
  });
});
