import jwt, { SignOptions } from 'jsonwebtoken';
import { ENV } from '../config/env';
import { UserRole } from '../models/User';

export interface JwtPayload {
  userId: string;
  email: string;
  role: UserRole;
  name: string;
  department?: string;
  usn?: string;
}

export const signToken = (payload: JwtPayload): string => {
  const options: SignOptions = {
    expiresIn: (ENV.JWT_EXPIRES_IN || '7d') as any,
  };
  return jwt.sign(payload, ENV.JWT_SECRET, options);
};

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    return jwt.verify(token, ENV.JWT_SECRET) as JwtPayload;
  } catch (error) {
    return null;
  }
};
