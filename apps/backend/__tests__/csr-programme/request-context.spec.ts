import { RequestContextService } from '../../src/common/request-context/request-context.service';

describe('RequestContextService', () => {
  afterEach(() => {
    RequestContextService.clear();
  });

  it('returns null when no actor set', () => {
    expect(RequestContextService.getActorId()).toBeNull();
  });

  it('stores actor id within async scope', async () => {
    RequestContextService.setActorId('user-123');
    expect(RequestContextService.getActorId()).toBe('user-123');

    await new Promise<void>((resolve) => {
      setImmediate(() => {
        expect(RequestContextService.getActorId()).toBe('user-123');
        resolve();
      });
    });

    RequestContextService.clear();
    expect(RequestContextService.getActorId()).toBeNull();
  });
});
