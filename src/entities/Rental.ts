import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import Property from './Property';
import Client from './Client';
import User from './User';

@Entity('rentals')
export default class Rental {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'property_id' })
    propertyId: number;

    @Column({ name: 'tenant_id' })
    tenantId: number;

    @Column({ type: 'date' })
    startDate: Date;

    @Column({ type: 'date' })
    endDate: Date;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    monthlyValue: number;

    @Column({ type: 'boolean', default: true })
    active: boolean;

    @Column({ name: 'created_by_user_id' })
    createdByUserId: number;

    @ManyToOne(() => Property, { eager: false })
    @JoinColumn({ name: 'property_id' })
    property!: Property;

    @ManyToOne(() => Client, { eager: false })
    @JoinColumn({ name: 'tenant_id' })
    tenant!: Client;

    @ManyToOne(() => User, { eager: false })
    @JoinColumn({ name: 'created_by_user_id' })
    createdByUser!: User;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    constructor(
        propertyId: number,
        tenantId: number,
        startDate: Date,
        endDate: Date,
        monthlyValue: number,
        createdByUserId: number,
        active: boolean = true
    ) {
        this.propertyId = propertyId;
        this.tenantId = tenantId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.monthlyValue = monthlyValue;
        this.createdByUserId = createdByUserId;
        this.active = active;
    }
}
