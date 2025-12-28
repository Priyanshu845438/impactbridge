import jwt, { SignOptions } from 'jsonwebtoken';

function getJwtSecret(): string {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.trim().length === 0) {
    throw new Error('JWT_SECRET environment variable is not set');
  }
  return secret;
}

const defaultSignOptions: SignOptions = { expiresIn: '1d' };

export function signToken(payload: object): string {
  return jwt.sign(payload, getJwtSecret(), defaultSignOptions);
}

export { getJwtSecret };
