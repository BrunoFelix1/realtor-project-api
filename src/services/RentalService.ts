import RentalRepository from '../repositories/RentalRepository';
import Rental from '../entities/Rental';

class RentalService {
    async list() {
        const rentals = await RentalRepository.findAll();
        // Busca o inquilino e o imóvel relacionados para cada aluguel
        const rentalsWithRelations = await Promise.all(
            rentals.map(async (rental) => {
                let tenantObj: any = undefined;
                let propertyObj: any = undefined;
                if (rental.tenantId) {
                    const { default: ClientRepository } = await import('../repositories/ClientRepository');
                    tenantObj = await ClientRepository.findById(rental.tenantId) || undefined;
                }
                if (rental.propertyId) {
                    const { default: PropertyRepository } = await import('../repositories/PropertyRepository');
                    propertyObj = await PropertyRepository.findById(rental.propertyId) || undefined;
                }
                return { ...rental, tenant: tenantObj, property: propertyObj };
            })
        );
        return rentalsWithRelations.map(rental => {
            if (rental.tenant === null || rental.property === null) {
                const { tenant, property, ...rest } = rental;
                return this.format(rest as Rental);
            }
            return this.format(rental as Rental);
        });
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

    private format(rental: Rental & { tenant?: any; property?: any }) {
        return {
            id: rental.id,
            propertyId: rental.propertyId,
            property: rental.property ?? undefined,
            tenantId: rental.tenantId,
            tenant: rental.tenant ?? undefined,
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
