import { AppDataSource } from '../config/data-source';
import Client from '../entities/Client';
import { Repository } from 'typeorm';

class ClientRepository {
    private repository: Repository<Client>;

    constructor() {
        this.repository = AppDataSource.getRepository(Client);
    }

    async findByEmail(email: string): Promise<Client | null> {
        return await this.repository.findOne({ where: { email } });
    }

    async findByDocument(document: string): Promise<Client | null> {
        return await this.repository.findOne({ where: { document } });
    }

    async findById(id: number): Promise<Client | null> {
        return await this.repository.findOne({ where: { id } });
    }

    async findByName(name: string): Promise<Client[]> {
        return await this.repository.createQueryBuilder('client')
            .where('client.name LIKE :name', { name: `%${name}%` })
            .getMany();
    }

    async create(name: string, email: string, phone: string, type: 'locador' | 'locatario', document: string): Promise<Client> {
        const client = new Client(name, email, phone, type, document);
        return await this.repository.save(client);
    }

    async save(client: Client): Promise<Client> {
        return await this.repository.save(client);
    }

    async findAll(): Promise<Client[]> {
        return await this.repository.find();
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}

export default new ClientRepository();
