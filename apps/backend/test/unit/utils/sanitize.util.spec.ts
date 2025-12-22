import {
  sanitizeEntity,
  sanitizeEntities,
} from '../../../src/utils/sanitize.util';

describe('sanitizeEntity', () => {
  it('removes sensitive keys and retains others', () => {
    const input = {
      id: 'user-1',
      name: 'Test User',
      password: 'hashed',
      salt: 'salt',
      accessToken: 'token',
      custom: 42,
    };

    const sanitized = sanitizeEntity(input);

    expect(sanitized).toEqual({
      id: 'user-1',
      name: 'Test User',
      custom: 42,
    });
  });

  it('returns null for undefined or null inputs', () => {
    expect(sanitizeEntity(null)).toBeNull();
    expect(sanitizeEntity(undefined)).toBeNull();
  });

  it('sanitizes nested objects and arrays recursively', () => {
    const input = {
      id: 'user-1',
      password: 'secret',
      profile: {
        about: 'NGO',
        refreshToken: 'nested',
      },
      campaigns: [
        {
          id: 'campaign-1',
          accessToken: 'token',
          donors: [
            {
              id: 'donor-1',
              verificationToken: 'verif',
            },
          ],
        },
      ],
    };

    expect(sanitizeEntity(input)).toEqual({
      id: 'user-1',
      profile: {
        about: 'NGO',
      },
      campaigns: [
        {
          id: 'campaign-1',
          donors: [
            {
              id: 'donor-1',
            },
          ],
        },
      ],
    });
  });
});

describe('sanitizeEntities', () => {
  it('sanitizes a list and drops null entries', () => {
    const input = [
      { id: '1', password: 'p1', keep: true },
      null,
      undefined,
      { id: '2', verificationToken: 'code', keep: false },
    ];

    const sanitized = sanitizeEntities(input);

    expect(sanitized).toEqual([
      { id: '1', keep: true },
      { id: '2', keep: false },
    ]);
  });

  it('returns empty array for nullish list', () => {
    expect(sanitizeEntities(null)).toEqual([]);
    expect(sanitizeEntities(undefined)).toEqual([]);
  });
});
