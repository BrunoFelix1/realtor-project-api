import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import { UserRole, JwtPayload, AuthRequest } from '../types/auth';

dotenv.config();

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.get('Authorization') || req.headers['authorization'] as string;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token de acesso requerido' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
        req.user = {
            userId: decoded.userId,    
            email: decoded.email,       
            role: decoded.role         
        };
        next();
    } catch (error) {
        return res.status(403).json({ message: 'Token inválido' });
    }
};

export const authorizeRole = (roles: UserRole[]) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({ message: 'Usuário não autenticado' });
        }

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Permissão insuficiente' });
        }

        next();
    };
};
