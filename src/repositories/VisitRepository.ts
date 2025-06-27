import { Repository } from 'typeorm';
import { AppDataSource } from '../config/data-source';
import Visit from '../entities/Visit';

class VisitRepository {
    private repository: Repository<Visit>;

    constructor() {
        this.repository = AppDataSource.getRepository(Visit);
    }

    async findById(id: number): Promise<Visit | null> {
        return await this.repository.findOne({ where: { id } });
    }

    async findAll(): Promise<Visit[]> {
        return await this.repository.find();
    }

    async findByClient(clientId: number): Promise<Visit[]> {
        return await this.repository.find({ where: { clientId } });
    }

    async findByProperty(propertyId: number): Promise<Visit[]> {
        return await this.repository.find({ where: { propertyId } });
    }

    async findByDate(scheduledAt: Date): Promise<Visit[]> {
        return await this.repository.find({ where: { scheduledAt } });
    }

    async create(visit: Visit): Promise<Visit> {
        return await this.repository.save(visit);
    }

    async save(visit: Visit): Promise<Visit> {
        return await this.repository.save(visit);
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}

export default new VisitRepository();
