import { Request } from 'express';

export type UserRole = 'admin' | 'corretor';

export interface JwtPayload {
    userId: number;
    email: string;
    role: UserRole;
}

export interface AuthRequest extends Request {
    user?: JwtPayload;
}
