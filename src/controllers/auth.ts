import { Request, Response } from 'express';
import UserRepository from '../repositories/UserRepository';
import { sign, verify, SignOptions } from 'jsonwebtoken';
import * as dotenv from 'dotenv';

dotenv.config();

export const register = async (req: Request, res: Response) => {
    
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await UserRepository.findByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'Usuário já existe com este email' });
        }
        const user = await UserRepository.create(name, email, password, role || 'user');

        // Verificar se JWT_SECRET existe
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET não configurado');
        }

        // Gerar token JWT
        const token = sign(
            { userId: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '7d' } as SignOptions
        );

        res.status(201).json({
            message: 'Usuário criado com sucesso',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Erro interno do servidor', error });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const user = await UserRepository.findByEmail(email);
        if (!user) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Credenciais inválidas' });
        }

        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET não configurado');
        }

        const token = sign(
            { userId: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN || '7d' } as SignOptions
        );

        res.status(200).json({
            message: 'Login realizado com sucesso',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Erro interno do servidor', error });
    }
};

