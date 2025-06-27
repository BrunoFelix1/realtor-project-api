import { Request, Response } from 'express';
import RentalService from '../services/RentalService';

class RentalController {
    async list(req: Request, res: Response) {
        try {
            const rentals = await RentalService.list();
            return res.status(200).json(rentals);
        } catch (error: any) {
            return res.status(500).json({ message: 'Erro ao listar aluguéis' });
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const rental = await RentalService.findById(Number(id));
            if (!rental) return res.status(404).json({ message: 'Aluguel não encontrado' });
            return res.status(200).json(rental);
        } catch (error: any) {
            return res.status(500).json({ message: 'Erro ao buscar aluguel por id' });
        }
    }

    async findByProperty(req: Request, res: Response) {
        try {
            const { propertyId } = req.params;
            const rentals = await RentalService.findByProperty(Number(propertyId));
            return res.status(200).json(rentals);
        } catch (error: any) {
            return res.status(500).json({ message: 'Erro ao buscar aluguéis por imóvel' });
        }
    }

    async findByTenant(req: Request, res: Response) {
        try {
            const { tenantId } = req.params;
            const rentals = await RentalService.findByTenant(Number(tenantId));
            return res.status(200).json(rentals);
        } catch (error: any) {
            return res.status(500).json({ message: 'Erro ao buscar aluguéis por inquilino' });
        }
    }

    async findActive(req: Request, res: Response) {
        try {
            const rentals = await RentalService.findActive();
            return res.status(200).json(rentals);
        } catch (error: any) {
            return res.status(500).json({ message: 'Erro ao buscar aluguéis ativos' });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const data = req.body;
            const rental = await RentalService.create(data);
            return res.status(201).json(rental);
        } catch (error: any) {
            return res.status(error.status || 500).json({ message: error.message || 'Erro ao criar aluguel' });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = req.body;
            const rental = await RentalService.update(Number(id), data);
            return res.status(200).json(rental);
        } catch (error: any) {
            return res.status(error.status || 500).json({ message: error.message || 'Erro ao atualizar aluguel' });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await RentalService.delete(Number(id));
            return res.status(204).send();
        } catch (error: any) {
            return res.status(error.status || 500).json({ message: error.message || 'Erro ao deletar aluguel' });
        }
    }
}

export default new RentalController();
