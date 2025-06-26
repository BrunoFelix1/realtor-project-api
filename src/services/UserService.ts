import UserRepository from '../repositories/UserRepository';
import { sign, SignOptions } from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

class UserService {
    async register(name: string, email: string, password: string, role: string = 'corretor') {
        const existingUser = await UserRepository.findByEmail(email);
        if (existingUser) {
            throw { status: 400, message: 'Usuário já existe com este email' };
        }
        const user = await UserRepository.create(name, email, password, role as any);

        if (!process.env.JWT_SECRET) {
            throw { status: 500, message: 'JWT_SECRET não configurado' };
        }

        const token = sign(
            { userId: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '7d' } as SignOptions
        );

        return {
            message: 'Usuário criado com sucesso',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        };
    }

    async login(email: string, password: string) {
        const user = await UserRepository.findByEmail(email);
        if (!user) {
            throw { status: 401, message: 'Credenciais inválidas' };
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            throw { status: 401, message: 'Credenciais inválidas' };
        }

        if (!process.env.JWT_SECRET) {
            throw { status: 500, message: 'JWT_SECRET não configurado' };
        }

        const token = sign(
            { userId: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '7d' } as SignOptions
        );

        return {
            message: 'Login realizado com sucesso',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        };
    }
}

export default new UserService();
