import { Request, Response } from 'express';
import UserService from '../services/UserService';

export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password, role } = req.body;
        const result = await UserService.register(name, email, password, role);
        res.status(201).json(result);
    } catch (error: any) {
        res.status(error.status || 500).json({ message: error.message || 'Erro interno do servidor', error });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const result = await UserService.login(email, password);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(error.status || 500).json({ message: error.message || 'Erro interno do servidor', error });
    }
};

