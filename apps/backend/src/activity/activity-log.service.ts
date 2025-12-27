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

  async log(
    actorId: string | null,
    action: string,
    metadata?: Record<string, unknown> | null,
  ): Promise<void>;
  async log(context: AuditLogContext): Promise<void>;
  async log(
    arg1: string | null | AuditLogContext,
    arg2?: string,
    arg3?: Record<string, unknown> | null,
  ): Promise<void> {
    if (typeof arg1 === 'object' && arg1 !== null && 'action' in arg1) {
      const context = arg1;
      await this.persistLog({
        actorId: context.actorId ?? null,
        action: context.action,
        details: {
          entity: context.entity,
          entityId: context.entityId,
          before: context.before ?? null,
          after: context.after ?? null,
          actorRole: context.actorRole ?? null,
          metadata: context.metadata ?? null,
        },
      });
      return;
    }

    const actorId = arg1 ?? null;
    const action = arg2 ?? 'UNKNOWN_ACTION';
    const metadata = arg3 ?? null;

    await this.persistLog({
      actorId,
      action,
      details: metadata ?? null,
    });
  }

  private async persistLog(params: {
    actorId: string | null;
    action: string;
    details: Record<string, unknown> | null;
  }) {
    await this.prisma.auditLog.create({
      data: {
        userId: params.actorId ?? undefined,
        action: params.action,
        details: params.details as unknown as Prisma.InputJsonValue,
      },
    });
  }
}
