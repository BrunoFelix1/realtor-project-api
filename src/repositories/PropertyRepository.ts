import { Repository } from 'typeorm';
import { AppDataSource } from '../config/data-source';
import Property from '../entities/Property';

class PropertyRepository {
    private repository: Repository<Property>;

    constructor() {
        this.repository = AppDataSource.getRepository(Property);
    }

    async findById(id: number): Promise<Property | null> {
        return await this.repository.findOne({ where: { id } });
    }

    async findAll(): Promise<Property[]> {
        return await this.repository.find();
    }

    async findByTitle(title: string): Promise<Property[]> {
        return await this.repository.createQueryBuilder('property')
            .where('property.title LIKE :title', { title: `%${title}%` })
            .getMany();
    }

    async findByLandlord(landlordId: number): Promise<Property[]> {
        return await this.repository.find({ where: { landlordId } });
    }

    async findAvailable(): Promise<Property[]> {
        return await this.repository.find({ where: { available: true } });
    }

    async create(property: Property): Promise<Property> {
        return await this.repository.save(property);
    }

    async save(property: Property): Promise<Property> {
        return await this.repository.save(property);
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}

export default new PropertyRepository();
