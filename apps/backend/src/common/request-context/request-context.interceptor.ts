import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RequestContextService } from './request-context.service';

@Injectable()
export class RequestContextInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const actorId: string | null = request?.user?.sub ?? null;
    RequestContextService.setActorId(actorId);

    return next.handle().pipe(
      tap({
        next: () => RequestContextService.clear(),
        error: () => RequestContextService.clear(),
      }),
    );
  }
}
