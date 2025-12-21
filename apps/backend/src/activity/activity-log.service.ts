import { Injectable } from '@nestjs/common';
import { Prisma } from 'prisma/generated';
import { PrismaService } from '../prisma/prisma.service';

export interface AuditLogContext {
  actorId: string | null;
  actorRole?: string | null;
  entity: string;
  entityId: string;
  action: string;
  before?: Record<string, unknown> | null;
  after?: Record<string, unknown> | null;
  metadata?: Record<string, unknown> | null;
}

@Injectable()
export class ActivityLogService {
  constructor(private readonly prisma: PrismaService) {}

  async log(context: AuditLogContext) {
    const details: Record<string, unknown> = {
      entity: context.entity,
      entityId: context.entityId,
      before: context.before ?? null,
      after: context.after ?? null,
      actorRole: context.actorRole ?? null,
      metadata: context.metadata ?? null,
    };

    await this.prisma.auditLog.create({
      data: {
        userId: context.actorId ?? undefined,
        action: context.action,
        details: details as unknown as Prisma.InputJsonValue,
      },
    });
  }
}
