import { Request, Response } from 'express';
import PropertyService from '../services/PropertyService';

class PropertyController {
    async list(req: Request, res: Response) {
        try {
            const properties = await PropertyService.list();
            return res.status(200).json(properties);
        } catch (error: any) {
            return res.status(500).json({ message: 'Erro ao listar imóveis' });
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const property = await PropertyService.findById(Number(id));
            if (!property) return res.status(404).json({ message: 'Imóvel não encontrado' });
            return res.status(200).json(property);
        } catch (error: any) {
            return res.status(500).json({ message: 'Erro ao buscar imóvel por id' });
        }
    }

    async findByTitle(req: Request, res: Response) {
        try {
            const { title } = req.params;
            const properties = await PropertyService.findByTitle(title);
            return res.status(200).json(properties);
        } catch (error: any) {
            return res.status(500).json({ message: 'Erro ao buscar imóveis por título' });
        }
    }

    async findByLandlord(req: Request, res: Response) {
        try {
            const { landlordId } = req.params;
            const properties = await PropertyService.findByLandlord(Number(landlordId));
            return res.status(200).json(properties);
        } catch (error: any) {
            return res.status(500).json({ message: 'Erro ao buscar imóveis por proprietário' });
        }
    }

    async findAvailable(req: Request, res: Response) {
        try {
            const properties = await PropertyService.findAvailable();
            return res.status(200).json(properties);
        } catch (error: any) {
            return res.status(500).json({ message: 'Erro ao buscar imóveis disponíveis' });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const data = req.body;
            const property = await PropertyService.create(data);
            return res.status(201).json(property);
        } catch (error: any) {
            return res.status(error.status || 500).json({ message: error.message || 'Erro ao criar imóvel' });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = req.body;
            const property = await PropertyService.update(Number(id), data);
            return res.status(200).json(property);
        } catch (error: any) {
            return res.status(error.status || 500).json({ message: error.message || 'Erro ao atualizar imóvel' });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await PropertyService.delete(Number(id));
            return res.status(204).send();
        } catch (error: any) {
            return res.status(error.status || 500).json({ message: error.message || 'Erro ao deletar imóvel' });
        }
    }
}

export default new PropertyController();
