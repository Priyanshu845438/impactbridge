import { validate } from 'class-validator';
import { RequestApprovalDto } from '../../../src/approvals/dto/request-approval.dto';

describe('RequestApprovalDto validation', () => {
  it('rejects invalid companyId format', async () => {
    const dto = new RequestApprovalDto();
    dto.companyId = 'not-a-uuid';

    const errors = await validate(dto);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints).toBeDefined();
  });

  it('accepts valid companyId', async () => {
    const dto = new RequestApprovalDto();
    dto.companyId = '123e4567-e89b-12d3-a456-426614174000';

    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });
});
