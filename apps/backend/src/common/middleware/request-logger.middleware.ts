import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { randomUUID } from 'crypto';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();
    const requestId = (req.headers['x-request-id'] as string) || randomUUID();
    (req as Request & { requestId?: string }).requestId = requestId;
    res.setHeader('x-request-id', requestId);

    res.on('finish', () => {
      const duration = Date.now() - start;
      const logPayload = {
        requestId,
        method: req.method,
        path: req.originalUrl,
        status: res.statusCode,
        duration,
      };

      if (process.env.NODE_ENV === 'production') {
        this.logger.log(JSON.stringify(logPayload));
      } else {
        this.logger.log(
          `${logPayload.method} ${logPayload.path} ${logPayload.status} +${logPayload.duration}ms [${logPayload.requestId}]`,
        );
      }
    });

    next();
  }
}
