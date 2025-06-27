import { Request, Response } from 'express';
import ReceiptService from '../services/ReceiptService';

class ReceiptController {
    async list(req: Request, res: Response) {
        try {
            const receipts = await ReceiptService.list();
            return res.status(200).json(receipts);
        } catch (error: any) {
            return res.status(500).json({ message: 'Erro ao listar recibos' });
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const receipt = await ReceiptService.findById(Number(id));
            if (!receipt) return res.status(404).json({ message: 'Recibo não encontrado' });
            return res.status(200).json(receipt);
        } catch (error: any) {
            return res.status(500).json({ message: 'Erro ao buscar recibo por id' });
        }
    }

    async findByRentInvoice(req: Request, res: Response) {
        try {
            const { rentInvoiceId } = req.params;
            const receipt = await ReceiptService.findByRentInvoice(Number(rentInvoiceId));
            if (!receipt) return res.status(404).json({ message: 'Recibo não encontrado' });
            return res.status(200).json(receipt);
        } catch (error: any) {
            return res.status(500).json({ message: 'Erro ao buscar recibo por fatura' });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const data = req.body;
            const receipt = await ReceiptService.create(data);
            return res.status(201).json(receipt);
        } catch (error: any) {
            return res.status(error.status || 500).json({ message: error.message || 'Erro ao criar recibo' });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = req.body;
            const receipt = await ReceiptService.update(Number(id), data);
            return res.status(200).json(receipt);
        } catch (error: any) {
            return res.status(error.status || 500).json({ message: error.message || 'Erro ao atualizar recibo' });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await ReceiptService.delete(Number(id));
            return res.status(204).send();
        } catch (error: any) {
            return res.status(error.status || 500).json({ message: error.message || 'Erro ao deletar recibo' });
        }
    }
}

export default new ReceiptController();
