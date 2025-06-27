import RentalRepository from '../repositories/RentalRepository';
import Rental from '../entities/Rental';

class RentalService {
    async list() {
        const rentals = await RentalRepository.findAll();
        return rentals.map(rental => this.format(rental));
    }

    async findById(id: number) {
        const rental = await RentalRepository.findById(id);
        if (!rental) return null;
        return this.format(rental);
    }

    async findByProperty(propertyId: number) {
        const rentals = await RentalRepository.findByProperty(propertyId);
        return rentals.map(rental => this.format(rental));
    }

    async findByTenant(tenantId: number) {
        const rentals = await RentalRepository.findByTenant(tenantId);
        return rentals.map(rental => this.format(rental));
    }

    async findActive() {
        const rentals = await RentalRepository.findActive();
        return rentals.map(rental => this.format(rental));
    }

    async create(data: {
        propertyId: number;
        tenantId: number;
        startDate: Date;
        endDate: Date;
        monthlyValue: number;
        createdByUserId: number;
        active?: boolean;
    }) {
        if (!data.propertyId || !data.tenantId || !data.startDate || !data.endDate || !data.monthlyValue || !data.createdByUserId) {
            throw { status: 400, message: 'Dados obrigatórios não informados' };
        }
        const rental = new Rental(
            data.propertyId,
            data.tenantId,
            data.startDate,
            data.endDate,
            data.monthlyValue,
            data.createdByUserId,
            data.active ?? true
        );
        const saved = await RentalRepository.create(rental);
        return this.format(saved);
    }

    async update(id: number, data: Partial<Rental>) {
        const rental = await RentalRepository.findById(id);
        if (!rental) throw { status: 404, message: 'Aluguel não encontrado' };
        Object.assign(rental, data);
        const saved = await RentalRepository.save(rental);
        return this.format(saved);
    }

    async delete(id: number) {
        const rental = await RentalRepository.findById(id);
        if (!rental) throw { status: 404, message: 'Aluguel não encontrado' };
        await RentalRepository.delete(id);
        return { message: 'Aluguel deletado com sucesso' };
    }

    private format(rental: Rental) {
        return {
            id: rental.id,
            propertyId: rental.propertyId,
            tenantId: rental.tenantId,
            startDate: rental.startDate,
            endDate: rental.endDate,
            monthlyValue: rental.monthlyValue,
            active: rental.active,
            createdByUserId: rental.createdByUserId,
            createdAt: rental.createdAt,
            updatedAt: rental.updatedAt
        };
    }
}

export default new RentalService();
