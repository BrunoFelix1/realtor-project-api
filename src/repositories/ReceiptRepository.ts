import { Repository } from 'typeorm';
import { AppDataSource } from '../config/data-source';
import Receipt from '../entities/Receipt';

class ReceiptRepository {
    private repository: Repository<Receipt>;

    constructor() {
        this.repository = AppDataSource.getRepository(Receipt);
    }

    async findById(id: number): Promise<Receipt | null> {
        return await this.repository.findOne({ where: { id } });
    }

    async findAll(): Promise<Receipt[]> {
        return await this.repository.find();
    }

    async findByRentInvoice(rentInvoiceId: number): Promise<Receipt | null> {
        return await this.repository.findOne({ where: { rentInvoiceId } });
    }

    async create(receipt: Receipt): Promise<Receipt> {
        return await this.repository.save(receipt);
    }

    async save(receipt: Receipt): Promise<Receipt> {
        return await this.repository.save(receipt);
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}

export default new ReceiptRepository();
