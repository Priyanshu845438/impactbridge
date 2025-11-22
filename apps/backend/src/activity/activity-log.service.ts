import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ActivityLogService {
  constructor(private readonly prisma: PrismaService) {}

  async log(
    userId: string | null,
    action: string,
    metadata?: Record<string, unknown>,
  ) {
    await this.prisma.auditLog.create({
      data: {
        userId: userId ?? undefined,
        action,
        details: metadata ? JSON.stringify(metadata) : undefined,
      },
    });
  }
}
