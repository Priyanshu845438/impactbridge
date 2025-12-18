import { apiRequest, normalizeError } from '../lib/api/client';

describe('apiRequest', () => {
  const originalFetch = global.fetch;

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it('returns parsed data on success', async () => {
    const mockResponse = { message: 'ok' };
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: () => Promise.resolve(mockResponse),
    });

    const result = await apiRequest({ path: '/test' });
    expect(result).toEqual({ status: 200, ok: true, data: mockResponse });
  });

  it('normalizes error responses', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: () => Promise.resolve({ message: 'Bad request' }),
    });

    await expect(apiRequest({ path: '/error' })).rejects.toEqual({
      status: 400,
      message: 'Bad request',
      details: { message: 'Bad request' },
    });
  });
});

describe('normalizeError', () => {
  it('uses payload message when available', () => {
    expect(normalizeError(422, { message: 'Invalid' })).toEqual({
      status: 422,
      message: 'Invalid',
      details: { message: 'Invalid' },
    });
  });

  it('falls back to generic message', () => {
    expect(normalizeError(500, null)).toEqual({
      status: 500,
      message: 'Server error',
      details: null,
    });
  });
});
