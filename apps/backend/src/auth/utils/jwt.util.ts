import jwt, { SignOptions } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET ?? '';

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not set');
}

const defaultSignOptions: SignOptions = { expiresIn: '1d' };

export async function signToken(payload: object): Promise<string> {
  return jwt.sign(payload, JWT_SECRET, defaultSignOptions);
}
