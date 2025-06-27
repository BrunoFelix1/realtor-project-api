import PropertyRepository from '../repositories/PropertyRepository';
import Property from '../entities/Property';

class PropertyService {
    async list() {
        const properties = await PropertyRepository.findAll();
        return properties.map(property => this.format(property));
    }

    async findById(id: number) {
        const property = await PropertyRepository.findById(id);
        if (!property) return null;
        return this.format(property);
    }

    async findByTitle(title: string) {
        const properties = await PropertyRepository.findByTitle(title);
        return properties.map(property => this.format(property));
    }

    async findByLandlord(landlordId: number) {
        const properties = await PropertyRepository.findByLandlord(landlordId);
        return properties.map(property => this.format(property));
    }

    async findAvailable() {
        const properties = await PropertyRepository.findAvailable();
        return properties.map(property => this.format(property));
    }

    async create(data: {
        title: string;
        description: string;
        address: string;
        price: number;
        available: boolean;
        landlordId: number;
        createdByUserId: number;
        photoBase64?: string;
        photoMimeType?: string;
        photoFileName?: string;
    }) {
        const property = new Property(
            data.title,
            data.description,
            data.address,
            data.price,
            data.available,
            data.landlordId,
            data.createdByUserId,
            data.photoBase64,
            data.photoMimeType,
            data.photoFileName
        );
        const saved = await PropertyRepository.create(property);
        return this.format(saved);
    }

    async update(id: number, data: Partial<Property>) {
        const property = await PropertyRepository.findById(id);
        if (!property) throw { status: 404, message: 'Imóvel não encontrado' };
        Object.assign(property, data);
        const saved = await PropertyRepository.save(property);
        return this.format(saved);
    }

    async delete(id: number) {
        const property = await PropertyRepository.findById(id);
        if (!property) throw { status: 404, message: 'Imóvel não encontrado' };
        await PropertyRepository.delete(id);
        return { message: 'Imóvel deletado com sucesso' };
    }

    private format(property: Property) {
        return {
            id: property.id,
            title: property.title,
            description: property.description,
            address: property.address,
            price: property.price,
            available: property.available,
            landlordId: property.landlordId,
            createdByUserId: property.createdByUserId,
            photoBase64: property.photoBase64,
            photoMimeType: property.photoMimeType,
            photoFileName: property.photoFileName,
            createdAt: property.createdAt,
            updatedAt: property.updatedAt
        };
    }
}

export default new PropertyService();
