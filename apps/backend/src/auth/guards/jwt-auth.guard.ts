import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { verify } from 'jsonwebtoken';
import { AuthUser } from '../types/auth-user.type';

const JWT_SECRET = process.env.JWT_SECRET;
type AuthenticatedRequest = Request & { user?: AuthUser };

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const authHeader = request.header('authorization');

    if (!authHeader) {
      throw new UnauthorizedException('Missing authorization header');
    }

    const [scheme, token] = authHeader.split(' ');

    if (scheme !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid authorization header format');
    }

    if (!JWT_SECRET) {
      throw new UnauthorizedException('Authentication unavailable');
    }

    try {
      const decoded = verify(token, JWT_SECRET) as AuthUser;
      request.user = decoded;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
