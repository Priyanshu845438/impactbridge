import { validate } from 'class-validator';

type ClassConstructor<T> = new () => T;

export async function expectValidationError<T>(
  Dto: ClassConstructor<T>,
  payload: Partial<T>,
) {
  const instance = Object.assign(new Dto(), payload);
  const errors = await validate(instance);

  if (errors.length === 0) {
    throw new Error('Expected validation errors but got none');
  }

  return errors;
}
