import { z } from 'zod';

export const approvalStatusSchema = z.enum([
  'PENDING',
  'APPROVED',
  'REJECTED',
  'REVOKED',
]);

export const approvalSummarySchema = z.object({
  id: z.string().uuid(),
  status: approvalStatusSchema,
  remarks: z.string().max(1000).nullable().optional(),
  campaign: z.object({
    id: z.string().uuid(),
    title: z.string().min(1),
    description: z.string().max(2000).nullable().optional(),
  }),
  ngo: z.object({
    id: z.string().uuid(),
    user: z.object({
      id: z.string().uuid(),
      name: z.string().min(1),
      email: z.string().email(),
    }),
  }),
  companyId: z.string().uuid(),
  ngoId: z.string().uuid(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const approvalRequestSchema = z.object({
  companyId: z.string().uuid({ message: 'Company is required' }),
  remarks: z
    .string()
    .trim()
    .max(1000, { message: 'Remarks must be 1000 characters or less' })
    .optional(),
});

export const approvalDecisionSchema = z.object({
  status: z
    .enum(['APPROVED', 'REJECTED'])
    .optional(),
  remarks: z
    .string()
    .trim()
    .max(1000, { message: 'Remarks must be 1000 characters or less' })
    .optional(),
});

export const approvalRevokeSchema = z.object({
  remarks: z
    .string()
    .trim()
    .max(1000, { message: 'Remarks must be 1000 characters or less' })
    .optional(),
});

export type ApprovalSummary = z.infer<typeof approvalSummarySchema>;
export type ApprovalRequestPayload = z.infer<typeof approvalRequestSchema>;
export type ApprovalDecisionPayload = z.infer<typeof approvalDecisionSchema>;
export type ApprovalRevokePayload = z.infer<typeof approvalRevokeSchema>;
