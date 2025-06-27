import { Request, Response } from 'express';
import VisitService from '../services/VisitService';

class VisitController {
    async list(req: Request, res: Response) {
        try {
            const visits = await VisitService.list();
            return res.status(200).json(visits);
        } catch (error: any) {
            return res.status(500).json({ message: 'Erro ao listar visitas' });
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const visit = await VisitService.findById(Number(id));
            if (!visit) return res.status(404).json({ message: 'Visita não encontrada' });
            return res.status(200).json(visit);
        } catch (error: any) {
            return res.status(500).json({ message: 'Erro ao buscar visita por id' });
        }
    }

    async findByClient(req: Request, res: Response) {
        try {
            const { clientId } = req.params;
            const visits = await VisitService.findByClient(Number(clientId));
            return res.status(200).json(visits);
        } catch (error: any) {
            return res.status(500).json({ message: 'Erro ao buscar visitas por cliente' });
        }
    }

    async findByProperty(req: Request, res: Response) {
        try {
            const { propertyId } = req.params;
            const visits = await VisitService.findByProperty(Number(propertyId));
            return res.status(200).json(visits);
        } catch (error: any) {
            return res.status(500).json({ message: 'Erro ao buscar visitas por imóvel' });
        }
    }

    async findByDate(req: Request, res: Response) {
        try {
            const { scheduledAt } = req.params;
            const date = new Date(scheduledAt);
            const visits = await VisitService.findByDate(date);
            return res.status(200).json(visits);
        } catch (error: any) {
            return res.status(500).json({ message: 'Erro ao buscar visitas por data' });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const data = req.body;
            const visit = await VisitService.create(data);
            return res.status(201).json(visit);
        } catch (error: any) {
            return res.status(error.status || 500).json({ message: error.message || 'Erro ao criar visita' });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = req.body;
            const visit = await VisitService.update(Number(id), data);
            return res.status(200).json(visit);
        } catch (error: any) {
            return res.status(error.status || 500).json({ message: error.message || 'Erro ao atualizar visita' });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await VisitService.delete(Number(id));
            return res.status(204).send();
        } catch (error: any) {
            return res.status(error.status || 500).json({ message: error.message || 'Erro ao deletar visita' });
        }
    }
}

export default new VisitController();
