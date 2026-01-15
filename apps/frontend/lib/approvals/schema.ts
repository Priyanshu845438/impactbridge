import { z } from 'zod';

const REMARK_MAX_MESSAGE = 'Remarks must be 1000 characters or less';
const REMARK_REQUIRED_REJECT = 'Remarks are required when rejecting a campaign';
const REMARK_REQUIRED_REVOKE = 'Remarks are required to revoke an approval';

const remarksField = z
  .string()
  .trim()
  .max(1000, { message: REMARK_MAX_MESSAGE });

export const approvalStatusSchema = z.enum([
  'PENDING',
  'APPROVED',
  'REJECTED',
  'REVOKED',
]);

export const approvalSummarySchema = z.object({
  id: z.string().uuid(),
  status: approvalStatusSchema,
  remarks: remarksField.nullable().optional(),
  campaign: z.object({
    id: z.string().uuid(),
    title: z.string().min(1),
    description: remarksField.nullable().optional(),
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
  remarks: remarksField.optional(),
});

export const approvalDecisionSchema = z
  .object({
    status: z
      .enum(['APPROVED', 'REJECTED'])
      .optional(),
    remarks: remarksField.optional(),
  })
  .superRefine((value, ctx) => {
    if (value.status === 'REJECTED') {
      const cleanRemarks = value.remarks?.trim() ?? '';
      if (cleanRemarks.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: REMARK_REQUIRED_REJECT,
          path: ['remarks'],
        });
      }
    }
  });

export const approvalRevokeSchema = z.object({
  remarks: remarksField.min(1, { message: REMARK_REQUIRED_REVOKE }),
});

export type ApprovalSummary = z.infer<typeof approvalSummarySchema>;
export type ApprovalRequestPayload = z.infer<typeof approvalRequestSchema>;
export type ApprovalDecisionPayload = z.infer<typeof approvalDecisionSchema>;
export type ApprovalRevokePayload = z.infer<typeof approvalRevokeSchema>;
