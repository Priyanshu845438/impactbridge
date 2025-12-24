import { validate } from 'class-validator';
import { ApproveProjectDto } from '../../../src/approvals/dto/approve-project.dto';
import { ApprovalDecisionStatus } from '../../../src/approvals/dto/approval-status.enum';

describe('ApproveProjectDto validation', () => {
  it('rejects invalid status values', async () => {
    const dto = new ApproveProjectDto();
    dto.status = 'INVALID' as any;

    const errors = await validate(dto);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints).toBeDefined();
  });

  it('passes validation for allowed status values', async () => {
    const dto = new ApproveProjectDto();
    dto.status = ApprovalDecisionStatus.APPROVED;

    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });
});
