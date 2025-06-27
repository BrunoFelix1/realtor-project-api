import { Request, Response } from 'express';
import ClientService from '../services/ClientService';

class ClientController {
    async list(req: Request, res: Response) {
        try {
            const clients = await ClientService.list();
            return res.status(200).json(clients);
        } catch (error: any) {
            return res.status(500).json({ message: 'Erro ao listar clientes' });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const { name, email, phone, type, document } = req.body;
            const result = await ClientService.register(name, email, phone, type, document);
            return res.status(201).json(result);
        } catch (error: any) {
            return res.status(error.status || 500).json({ message: error.message || 'Erro ao criar cliente' });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, email, phone, type, document } = req.body;
            const result = await ClientService.update(Number(id), { name, email, phone, type, document });
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(error.status || 500).json({ message: error.message || 'Erro ao atualizar cliente' });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await ClientService.delete(Number(id));
            return res.status(204).send();
        } catch (error: any) {
            return res.status(error.status || 500).json({ message: error.message || 'Erro ao deletar cliente' });
        }
    }

    async findByEmail(req: Request, res: Response) {
        try {
            const { email } = req.params;
            const client = await ClientService.findByEmail(email);
            if (!client) return res.status(404).json({ message: 'Cliente não encontrado' });
            return res.status(200).json(client);
        } catch (error: any) {
            return res.status(500).json({ message: 'Erro ao buscar cliente por email' });
        }
    }

    async findByName(req: Request, res: Response) {
        try {
            const { name } = req.params;
            const clients = await ClientService.findByName(name);
            return res.status(200).json(clients);
        } catch (error: any) {
            return res.status(500).json({ message: 'Erro ao buscar clientes por nome' });
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const client = await ClientService.findById(Number(id));
            if (!client) return res.status(404).json({ message: 'Cliente não encontrado' });
            return res.status(200).json(client);
        } catch (error: any) {
            return res.status(500).json({ message: 'Erro ao buscar cliente por id' });
        }
    }

    async findByDocument(req: Request, res: Response) {
        try {
            const { document } = req.params;
            const client = await ClientService.findByDocument(document);
            if (!client) return res.status(404).json({ message: 'Cliente não encontrado' });
            return res.status(200).json(client);
        } catch (error: any) {
            return res.status(500).json({ message: 'Erro ao buscar cliente por documento' });
        }
    }
}

export default new ClientController();
