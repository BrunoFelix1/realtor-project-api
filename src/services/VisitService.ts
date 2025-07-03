import VisitRepository from '../repositories/VisitRepository';
import Visit from '../entities/Visit';

class VisitService {
    async list() {
        const visits = await VisitRepository.findAll();
        const visitsWithClient = await Promise.all(
            visits.map(async (visit) => {
                if (!visit.client && visit.clientId) {
                    const { default: ClientRepository } = await import('../repositories/ClientRepository');
                    const client = await ClientRepository.findById(visit.clientId);
                    return { ...visit, client };
                }
                return visit;
            })
        );
        return visitsWithClient.map(visit => {
            if (visit.client === null) {
                const { client, ...rest } = visit;
                return this.format(rest as Visit);
            }
            return this.format(visit as Visit);
        });
    }

    async findById(id: number) {
        const visit = await VisitRepository.findById(id);
        if (!visit) return null;
        return this.format(visit);
    }

    async findByClient(clientId: number) {
        const visits = await VisitRepository.findByClient(clientId);
        return visits.map(visit => this.format(visit));
    }

    async findByProperty(propertyId: number) {
        const visits = await VisitRepository.findByProperty(propertyId);
        return visits.map(visit => this.format(visit));
    }

    async findByDate(scheduledAt: Date) {
        const visits = await VisitRepository.findByDate(scheduledAt);
        return visits.map(visit => this.format(visit));
    }

    async create(data: {
        propertyId: number;
        clientId: number;
        scheduledAt: Date;
        createdByUserId: number;
        status?: 'agendada' | 'realizada' | 'cancelada';
        notes?: string;
    }) {
        if (!data.propertyId || !data.clientId || !data.scheduledAt || !data.createdByUserId) {
            throw { status: 400, message: 'Dados obrigatórios não informados' };
        }
        const visit = new Visit(
            data.propertyId,
            data.clientId,
            data.scheduledAt,
            data.createdByUserId,
            data.status,
            data.notes
        );
        const saved = await VisitRepository.create(visit);
        return this.format(saved);
    }

    async update(id: number, data: Partial<Visit>) {
        const visit = await VisitRepository.findById(id);
        if (!visit) throw { status: 404, message: 'Visita não encontrada' };
        Object.assign(visit, data);
        const saved = await VisitRepository.save(visit);
        return this.format(saved);
    }

    async delete(id: number) {
        const visit = await VisitRepository.findById(id);
        if (!visit) throw { status: 404, message: 'Visita não encontrada' };
        await VisitRepository.delete(id);
        return { message: 'Visita deletada com sucesso' };
    }

    private format(visit: Visit & { client?: any }) {
        return {
            id: visit.id,
            propertyId: visit.propertyId,
            clientId: visit.clientId,
            client: visit.client ?? undefined,
            scheduledAt: visit.scheduledAt,
            status: visit.status,
            notes: visit.notes,
            createdByUserId: visit.createdByUserId,
            createdAt: visit.createdAt,
            updatedAt: visit.updatedAt
        };
    }
}

export default new VisitService();
