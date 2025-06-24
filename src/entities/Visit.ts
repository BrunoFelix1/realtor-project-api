import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import Property from './Property';
import Client from './Client';

@Entity('visits')
export default class Visit {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'property_id' })
    propertyId: number;

    @Column({ name: 'client_id' })
    clientId: number;

    @Column({ type: 'timestamp' })
    scheduledAt: Date;

    @Column({ type: 'enum', enum: ['agendada', 'realizada', 'cancelada'], default: 'agendada' })
    status: 'agendada' | 'realizada' | 'cancelada';

    @Column({ type: 'text', nullable: true })
    notes?: string;

    @ManyToOne(() => Property, { eager: false })
    @JoinColumn({ name: 'property_id' })
    property!: Property;

    @ManyToOne(() => Client, { eager: false })
    @JoinColumn({ name: 'client_id' })
    client!: Client;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    constructor(
        propertyId: number,
        clientId: number,
        scheduledAt: Date,
        status: 'agendada' | 'realizada' | 'cancelada' = 'agendada',
        notes?: string
    ) {
        this.propertyId = propertyId;
        this.clientId = clientId;
        this.scheduledAt = scheduledAt;
        this.status = status;
        this.notes = notes;
    }
}