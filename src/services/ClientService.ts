import ClientRepository from '../repositories/ClientRepository';
import Client from '../entities/Client';

class ClientService {
    async register(name: string, email: string, phone: string, type: 'locador' | 'locatario', document: string) {
        const existingEmail = await ClientRepository.findByEmail(email);
        if (existingEmail) {
            throw { status: 400, message: 'Já existe um cliente com este e-mail' };
        }
        const existingDocument = await ClientRepository.findByDocument(document);
        if (existingDocument) {
            throw { status: 400, message: 'Já existe um cliente com este documento' };
        }
        const client = await ClientRepository.create(name, email, phone, type, document);
        return {
            message: 'Cliente criado com sucesso',
            client: {
                id: client.id,
                name: client.name,
                email: client.email,
                phone: client.phone,
                type: client.type,
                document: client.document
            }
        };
    }

    async list() {
        const clients = await ClientRepository.findAll();
        return clients.map(client => ({
            id: client.id,
            name: client.name,
            email: client.email,
            phone: client.phone,
            type: client.type,
            document: client.document
        }));
    }

    async update(id: number, data: { name?: string; email?: string; phone?: string; type?: 'locador' | 'locatario'; document?: string }) {
        const client = await ClientRepository.findById(id);
        if (!client) {
            throw { status: 404, message: 'Cliente não encontrado' };
        }
        if (data.name) client.name = data.name;
        if (data.email) client.email = data.email;
        if (data.phone) client.phone = data.phone;
        if (data.type) client.type = data.type;
        if (data.document) client.document = data.document;
        await ClientRepository.save(client);
        return {
            message: 'Cliente atualizado com sucesso',
            client: {
                id: client.id,
                name: client.name,
                email: client.email,
                phone: client.phone,
                type: client.type,
                document: client.document
            }
        };
    }

    async delete(id: number) {
        const client = await ClientRepository.findById(id);
        if (!client) {
            throw { status: 404, message: 'Cliente não encontrado' };
        }
        await ClientRepository.delete(id);
        return { message: 'Cliente deletado com sucesso' };
    }

    async findByEmail(email: string) {
        const client = await ClientRepository.findByEmail(email);
        if (!client) return null;
        return {
            id: client.id,
            name: client.name,
            email: client.email,
            phone: client.phone,
            type: client.type,
            document: client.document
        };
    }

    async findByName(name: string) {
        const clients = await ClientRepository.findByName(name);
        return clients.map(client => ({
            id: client.id,
            name: client.name,
            email: client.email,
            phone: client.phone,
            type: client.type,
            document: client.document
        }));
    }

    async findById(id: number) {
        const client = await ClientRepository.findById(id);
        if (!client) return null;
        return {
            id: client.id,
            name: client.name,
            email: client.email,
            phone: client.phone,
            type: client.type,
            document: client.document
        };
    }

    async findByDocument(document: string) {
        const client = await ClientRepository.findByDocument(document);
        if (!client) return null;
        return {
            id: client.id,
            name: client.name,
            email: client.email,
            phone: client.phone,
            type: client.type,
            document: client.document
        };
    }
}

export default new ClientService();
