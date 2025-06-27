import ClientHistoryRepository from '../repositories/ClientHistoryRepository';
import ClientHistory from '../entities/ClientHistory';

class ClientHistoryService {
    async list() {
        const history = await ClientHistoryRepository.findAll();
        return history.map(h => this.format(h));
    }

    async findById(id: number) {
        const entry = await ClientHistoryRepository.findById(id);
        if (!entry) return null;
        return this.format(entry);
    }

    async findByClient(clientId: number) {
        const history = await ClientHistoryRepository.findByClient(clientId);
        return history.map(h => this.format(h));
    }

    async findByUser(userId: number) {
        const history = await ClientHistoryRepository.findByUser(userId);
        return history.map(h => this.format(h));
    }

    async create(data: {
        clientId: number;
        userId: number;
        action: string;
        timestamp?: Date;
        referenceId?: number;
    }) {
        if (!data.clientId || !data.userId || !data.action) {
            throw { status: 400, message: 'Dados obrigatórios não informados' };
        }
        const entry = new ClientHistory(
            data.clientId,
            data.userId,
            data.action,
            data.timestamp || new Date(),
            data.referenceId
        );
        const saved = await ClientHistoryRepository.create(entry);
        return this.format(saved);
    }

    private format(entry: ClientHistory) {
        return {
            id: entry.id,
            clientId: entry.clientId,
            userId: entry.userId,
            action: entry.action,
            referenceId: entry.referenceId,
            timestamp: entry.timestamp,
            createdAt: entry.createdAt
        };
    }
}

export default new ClientHistoryService();
