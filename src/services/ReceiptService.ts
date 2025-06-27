import ReceiptRepository from '../repositories/ReceiptRepository';
import Receipt from '../entities/Receipt';

class ReceiptService {
    async list() {
        const receipts = await ReceiptRepository.findAll();
        return receipts.map(receipt => this.format(receipt));
    }

    async findById(id: number) {
        const receipt = await ReceiptRepository.findById(id);
        if (!receipt) return null;
        return this.format(receipt);
    }

    async findByRentInvoice(rentInvoiceId: number) {
        const receipt = await ReceiptRepository.findByRentInvoice(rentInvoiceId);
        if (!receipt) return null;
        return this.format(receipt);
    }

    async create(data: {
        rentInvoiceId: number;
        issuedAt: Date;
        commissionValue: number;
        taxValue: number;
        totalValue: number;
    }) {
        if (!data.rentInvoiceId || !data.issuedAt || data.commissionValue == null || data.taxValue == null || data.totalValue == null) {
            throw { status: 400, message: 'Dados obrigatórios não informados' };
        }
        const receipt = new Receipt(
            data.rentInvoiceId,
            data.issuedAt,
            data.commissionValue,
            data.taxValue,
            data.totalValue
        );
        const saved = await ReceiptRepository.create(receipt);
        return this.format(saved);
    }

    async update(id: number, data: Partial<Receipt>) {
        const receipt = await ReceiptRepository.findById(id);
        if (!receipt) throw { status: 404, message: 'Recibo não encontrado' };
        Object.assign(receipt, data);
        const saved = await ReceiptRepository.save(receipt);
        return this.format(saved);
    }

    async delete(id: number) {
        const receipt = await ReceiptRepository.findById(id);
        if (!receipt) throw { status: 404, message: 'Recibo não encontrado' };
        await ReceiptRepository.delete(id);
        return { message: 'Recibo deletado com sucesso' };
    }

    private format(receipt: Receipt) {
        return {
            id: receipt.id,
            rentInvoiceId: receipt.rentInvoiceId,
            issuedAt: receipt.issuedAt,
            commissionValue: receipt.commissionValue,
            taxValue: receipt.taxValue,
            totalValue: receipt.totalValue,
            createdAt: receipt.createdAt,
            updatedAt: receipt.updatedAt
        };
    }
}

export default new ReceiptService();
