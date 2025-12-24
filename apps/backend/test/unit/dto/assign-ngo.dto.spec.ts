import { validate } from 'class-validator';
import { AssignNgoDto } from '../../../src/csr-programme/dto/assign-ngo.dto';

describe('AssignNgoDto validation', () => {
  it('rejects invalid ngoId format', async () => {
    const dto = new AssignNgoDto();
    dto.ngoId = 'invalid-id';

    const errors = await validate(dto);
    expect(errors).toHaveLength(1);
    expect(errors[0].constraints).toBeDefined();
  });

  it('accepts valid ngoId', async () => {
    const dto = new AssignNgoDto();
    dto.ngoId = '123e4567-e89b-12d3-a456-426614174000';

    const errors = await validate(dto);
    expect(errors).toHaveLength(0);
  });
});
