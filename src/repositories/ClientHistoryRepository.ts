import { Repository } from 'typeorm';
import { AppDataSource } from '../config/data-source';
import ClientHistory from '../entities/ClientHistory';

class ClientHistoryRepository {
    private repository: Repository<ClientHistory>;

    constructor() {
        this.repository = AppDataSource.getRepository(ClientHistory);
    }

    async findById(id: number): Promise<ClientHistory | null> {
        return await this.repository.findOne({ where: { id } });
    }

    async findAll(): Promise<ClientHistory[]> {
        return await this.repository.find();
    }

    async findByClient(clientId: number): Promise<ClientHistory[]> {
        return await this.repository.find({ where: { clientId } });
    }

    async findByUser(userId: number): Promise<ClientHistory[]> {
        return await this.repository.find({ where: { userId } });
    }

    async create(history: ClientHistory): Promise<ClientHistory> {
        return await this.repository.save(history);
    }

    async save(history: ClientHistory): Promise<ClientHistory> {
        return await this.repository.save(history);
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}

export default new ClientHistoryRepository();
