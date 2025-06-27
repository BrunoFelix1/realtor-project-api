import RentInvoiceRepository from '../repositories/RentInvoiceRepository';
import RentInvoice from '../entities/RentInvoice';

class RentInvoiceService {
    async list() {
        const invoices = await RentInvoiceRepository.findAll();
        return invoices.map(invoice => this.format(invoice));
    }

    async findById(id: number) {
        const invoice = await RentInvoiceRepository.findById(id);
        if (!invoice) return null;
        return this.format(invoice);
    }

    async findByRental(rentalId: number) {
        const invoices = await RentInvoiceRepository.findByRental(rentalId);
        return invoices.map(invoice => this.format(invoice));
    }

    async findByMonthYear(month: number, year: number) {
        const invoices = await RentInvoiceRepository.findByMonthYear(month, year);
        return invoices.map(invoice => this.format(invoice));
    }

    async create(data: {
        rentalId: number;
        dueDate: Date;
        amount: number;
        status: 'pendente' | 'pago' | 'atrasado';
        paidAt?: Date;
    }) {
        if (!data.rentalId || !data.dueDate || data.amount == null || !data.status) {
            throw { status: 400, message: 'Dados obrigatórios não informados' };
        }
        const invoice = new RentInvoice(
            data.rentalId,
            data.dueDate,
            data.amount,
            data.status,
            data.paidAt
        );
        const saved = await RentInvoiceRepository.create(invoice);
        return this.format(saved);
    }

    async update(id: number, data: Partial<RentInvoice>) {
        const invoice = await RentInvoiceRepository.findById(id);
        if (!invoice) throw { status: 404, message: 'Fatura não encontrada' };
        Object.assign(invoice, data);
        const saved = await RentInvoiceRepository.save(invoice);
        return this.format(saved);
    }

    async delete(id: number) {
        const invoice = await RentInvoiceRepository.findById(id);
        if (!invoice) throw { status: 404, message: 'Fatura não encontrada' };
        await RentInvoiceRepository.delete(id);
        return { message: 'Fatura deletada com sucesso' };
    }

    private format(invoice: RentInvoice) {
        return {
            id: invoice.id,
            rentalId: invoice.rentalId,
            dueDate: invoice.dueDate,
            amount: invoice.amount,
            status: invoice.status,
            paidAt: invoice.paidAt,
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt
        };
    }
}

export default new RentInvoiceService();
