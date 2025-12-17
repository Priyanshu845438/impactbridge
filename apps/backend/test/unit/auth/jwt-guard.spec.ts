import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtAuthGuard } from '../../../src/auth/guards/jwt-auth.guard';

describe('JwtAuthGuard', () => {
  const guard = new JwtAuthGuard();

  const createContext = (headers: Record<string, string>): ExecutionContext => ({
    switchToHttp: () => ({
      getRequest: () => ({
        header: (name: string) => headers[name.toLowerCase()],
        user: undefined,
      }),
    }),
  }) as unknown as ExecutionContext;

  it('throws when authorization header missing', () => {
    const context = createContext({});
    expect(() => guard.canActivate(context)).toThrow(UnauthorizedException);
  });

  it('rejects invalid tokens', () => {
    process.env.JWT_SECRET = 'test-secret';
    const context = createContext({ authorization: 'Bearer token' });
    expect(() => guard.canActivate(context)).toThrow('Invalid or expired token');
  });
});
