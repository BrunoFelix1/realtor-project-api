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

    async list() {
        const users = await UserRepository.findAll();
        return users.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }));
    }

    async update(id: number, data: { name?: string; email?: string; password?: string; role?: string }) {
        const user = await UserRepository.findById(id);
        if (!user) {
            throw { status: 404, message: 'Usuário não encontrado' };
        }
        if (data.name) user.name = data.name;
        if (data.email) user.email = data.email;
        if (data.role) user.role = data.role as any;
        if (data.password) user.password = data.password; // a propria entity já faz hash deboa
        await UserRepository.save(user);
        return {
            message: 'Usuário atualizado com sucesso',
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        };
    }

    async delete(id: number) {
        const user = await UserRepository.findById(id);
        if (!user) {
            throw { status: 404, message: 'Usuário não encontrado' };
        }
        await UserRepository.delete(id);
        return { message: 'Usuário deletado com sucesso' };
    }

    async findByEmail(email: string) {
        const user = await UserRepository.findByEmail(email);
        if (!user) return null;
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        };
    }

    async findByName(name: string) {
        const users = await UserRepository.findByName(name);
        return users.map(user => ({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }));
    }
}

export default new UserService();
