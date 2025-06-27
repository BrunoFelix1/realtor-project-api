import { Repository } from 'typeorm';
import { AppDataSource } from '../config/data-source';
import RentInvoice from '../entities/RentInvoice';

class RentInvoiceRepository {
    private repository: Repository<RentInvoice>;

    constructor() {
        this.repository = AppDataSource.getRepository(RentInvoice);
    }

    async findById(id: number): Promise<RentInvoice | null> {
        return await this.repository.findOne({ where: { id } });
    }

    async findAll(): Promise<RentInvoice[]> {
        return await this.repository.find();
    }

    async findByRental(rentalId: number): Promise<RentInvoice[]> {
        return await this.repository.find({ where: { rentalId } });
    }

    async findByMonthYear(month: number, year: number): Promise<RentInvoice[]> {
        return await this.repository.createQueryBuilder('invoice')
            .where('MONTH(invoice.dueDate) = :month AND YEAR(invoice.dueDate) = :year', { month, year })
            .getMany();
    }

    async create(rentInvoice: RentInvoice): Promise<RentInvoice> {
        return await this.repository.save(rentInvoice);
    }

    async save(rentInvoice: RentInvoice): Promise<RentInvoice> {
        return await this.repository.save(rentInvoice);
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}

export default new RentInvoiceRepository();
