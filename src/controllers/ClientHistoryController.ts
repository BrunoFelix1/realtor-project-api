import { Request, Response } from 'express';
import ClientHistoryService from '../services/ClientHistoryService';

class ClientHistoryController {
    async list(req: Request, res: Response) {
        try {
            const history = await ClientHistoryService.list();
            return res.status(200).json(history);
        } catch (error: any) {
            return res.status(500).json({ message: 'Erro ao listar histórico de clientes' });
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const entry = await ClientHistoryService.findById(Number(id));
            if (!entry) return res.status(404).json({ message: 'Histórico não encontrado' });
            return res.status(200).json(entry);
        } catch (error: any) {
            return res.status(500).json({ message: 'Erro ao buscar histórico por id' });
        }
    }

    async findByClient(req: Request, res: Response) {
        try {
            const { clientId } = req.params;
            const history = await ClientHistoryService.findByClient(Number(clientId));
            return res.status(200).json(history);
        } catch (error: any) {
            return res.status(500).json({ message: 'Erro ao buscar histórico por cliente' });
        }
    }

    async findByUser(req: Request, res: Response) {
        try {
            const { userId } = req.params;
            const history = await ClientHistoryService.findByUser(Number(userId));
            return res.status(200).json(history);
        } catch (error: any) {
            return res.status(500).json({ message: 'Erro ao buscar histórico por usuário' });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const data = req.body;
            const entry = await ClientHistoryService.create(data);
            return res.status(201).json(entry);
        } catch (error: any) {
            return res.status(error.status || 500).json({ message: error.message || 'Erro ao criar histórico' });
        }
    }
}

export default new ClientHistoryController();
