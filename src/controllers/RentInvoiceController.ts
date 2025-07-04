import { Request, Response } from 'express';
import RentInvoiceService from '../services/RentInvoiceService';
import { generateInvoiceDocument } from '../utils/base';

class RentInvoiceController {
    async list(req: Request, res: Response) {
        try {
            const invoices = await RentInvoiceService.list();
            return res.status(200).json(invoices);
        } catch (error: any) {
            return res.status(500).json({ message: 'Erro ao listar faturas' });
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const invoice = await RentInvoiceService.findById(Number(id));
            if (!invoice) return res.status(404).json({ message: 'Fatura não encontrada' });
            return res.status(200).json(invoice);
        } catch (error: any) {
            return res.status(500).json({ message: 'Erro ao buscar fatura por id' });
        }
    }

    async findByRental(req: Request, res: Response) {
        try {
            const { rentalId } = req.params;
            const invoices = await RentInvoiceService.findByRental(Number(rentalId));
            return res.status(200).json(invoices);
        } catch (error: any) {
            return res.status(500).json({ message: 'Erro ao buscar faturas por aluguel' });
        }
    }

    async findByMonthYear(req: Request, res: Response) {
        try {
            const { month, year } = req.params;
            const invoices = await RentInvoiceService.findByMonthYear(Number(month), Number(year));
            return res.status(200).json(invoices);
        } catch (error: any) {
            return res.status(500).json({ message: 'Erro ao buscar faturas por mês/ano' });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const data = req.body;
            const invoice = await RentInvoiceService.create(data);
            
            const fullInvoice = await RentInvoiceService.findById(invoice.id);
            if (!fullInvoice) {
                return res.status(500).json({ message: 'Erro ao buscar fatura criada' });
            }

            const invoiceDocument = generateInvoiceDocument(fullInvoice);
            
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.setHeader('Content-Disposition', `inline; filename="fatura-${invoice.id}.html"`);
            return res.status(201).send(invoiceDocument);
        } catch (error: any) {
            return res.status(error.status || 500).json({ message: error.message || 'Erro ao criar fatura' });
        }
    }

    async generateDocument(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const invoice = await RentInvoiceService.findById(Number(id));
            if (!invoice) {
                return res.status(404).json({ message: 'Fatura não encontrada' });
            }

            const invoiceDocument = generateInvoiceDocument(invoice);
            
            res.setHeader('Content-Type', 'text/html; charset=utf-8');
            res.setHeader('Content-Disposition', `inline; filename="fatura-${invoice.id}.html"`);
            return res.status(200).send(invoiceDocument);
        } catch (error: any) {
            return res.status(500).json({ message: 'Erro ao gerar documento da fatura' });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = req.body;
            const invoice = await RentInvoiceService.update(Number(id), data);
            return res.status(200).json(invoice);
        } catch (error: any) {
            return res.status(error.status || 500).json({ message: error.message || 'Erro ao atualizar fatura' });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await RentInvoiceService.delete(Number(id));
            return res.status(204).send();
        } catch (error: any) {
            return res.status(error.status || 500).json({ message: error.message || 'Erro ao deletar fatura' });
        }
    }
}

export default new RentInvoiceController();
