import { Request, Response } from 'express';
import UserService from '../services/UserService';

class UserController {
    async list(req: Request, res: Response) {
        try {
            const users = await UserService.list();
            return res.status(200).json(users);
        } catch (error: any) {
            return res.status(500).json({ message: 'Erro ao listar usuários' });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const { name, email, password, role } = req.body;
            const result = await UserService.register(name, email, password, role);
            return res.status(201).json(result);
        } catch (error: any) {
            return res.status(error.status || 500).json({ message: error.message || 'Erro ao criar usuário' });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, email, password, role } = req.body;
            const result = await UserService.update(Number(id), { name, email, password, role });
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(error.status || 500).json({ message: error.message || 'Erro ao atualizar usuário' });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await UserService.delete(Number(id));
            return res.status(204).send();
        } catch (error: any) {
            return res.status(error.status || 500).json({ message: error.message || 'Erro ao deletar usuário' });
        }
    }

    async findByEmail(req: Request, res: Response) {
        try {
            const { email } = req.params;
            const user = await UserService.findByEmail(email);
            if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
            return res.status(200).json(user);
        } catch (error: any) {
            return res.status(500).json({ message: 'Erro ao buscar usuário por email' });
        }
    }

    async findByName(req: Request, res: Response) {
        try {
            const { name } = req.params;
            const users = await UserService.findByName(name);
            return res.status(200).json(users);
        } catch (error: any) {
            return res.status(500).json({ message: 'Erro ao buscar usuários por nome' });
        }
    }
}

export default new UserController();
