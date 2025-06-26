import { AppDataSource } from '../config/data-source';
import User from '../entities/User';
import { Repository } from 'typeorm';
import { UserRole } from '../types/auth';

class UserRepository {
    private repository: Repository<User>;

    constructor() {
        this.repository = AppDataSource.getRepository(User);
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.repository.findOne({ where: { email } });
    }

    async findByName(name: string): Promise<User | null> {
        return await this.repository.findOne({ where: { name } });
    }

    async findById(id: number): Promise<User | null> {
        return await this.repository.findOne({ where: { id } });
    }

    async create(name: string, email: string, password: string, role: UserRole = 'corretor'): Promise<User> {
        const user = new User(name, email, password, role);
        return await this.repository.save(user);
    }

    async save(user: User): Promise<User> {
        return await this.repository.save(user);
    }

    async findAll(): Promise<User[]> {
        return await this.repository.find();
    }

    async delete(id: number): Promise<void> {
        await this.repository.delete(id);
    }
}

export default new UserRepository();
