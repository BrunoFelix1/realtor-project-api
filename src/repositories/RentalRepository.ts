import { Repository } from 'typeorm';
import { AppDataSource } from '../config/data-source';
import Rental from '../entities/Rental';

class RentalRepository {
    private repository: Repository<Rental>;

    constructor() {
        this.repository = AppDataSource.getRepository(Rental);
    }

    async findById(id: number): Promise<Rental | null> {
        return await this.repository.findOne({ where: { id } });
    }

    async findAll(): Promise<Rental[]> {
        return await this.repository.find();
    }

    async findByProperty(propertyId: number): Promise<Rental[]> {
        return await this.repository.find({ where: { propertyId } });
    }

    async findByTenant(tenantId: number): Promise<Rental[]> {
        return await this.repository.find({ where: { tenantId } });
    }

    async findActive(): Promise<Rental[]> {
        return await this.repository.find({ where: { active: true } });
    }

    async create(rental: Rental): Promise<Rental> {
        return await this.repository.save(rental);
    }

    async save(rental: Rental): Promise<Rental> {
        return await this.repository.save(rental);
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}

export default new RentalRepository();
