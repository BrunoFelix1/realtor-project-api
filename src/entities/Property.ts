
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import Client from './Client';

@Entity('properties')
export default class Property {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'varchar', length: 500 })
    address: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @Column({ type: 'boolean', default: true })
    available: boolean;

    @Column({ name: 'landlord_id' })
    landlordId: number;

    @ManyToOne(() => Client, { eager: false })
    @JoinColumn({ name: 'landlord_id' })
    landlord!: Client;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;    constructor(
        title: string,
        description: string,
        address: string,
        price: number,
        available: boolean,
        landlordId: number
    ) {
        this.title = title;
        this.description = description;
        this.address = address;
        this.price = price;
        this.available = available;
        this.landlordId = landlordId;
    }

}