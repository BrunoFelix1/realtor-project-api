import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import Client from './Client';
import User from './User';

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
    price: number;    @Column({ type: 'boolean', default: true })
    available: boolean;

    @Column({ type: 'text', nullable: true })
    photoBase64?: string;

    @Column({ type: 'varchar', length: 100, nullable: true })
    photoMimeType?: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    photoFileName?: string;

    @Column({ name: 'landlord_id' })
    landlordId: number;

    @Column({ name: 'created_by_user_id' })
    createdByUserId: number;

    @ManyToOne(() => Client, { eager: false })
    @JoinColumn({ name: 'landlord_id' })
    landlord!: Client;

    @ManyToOne(() => User, { eager: false })
    @JoinColumn({ name: 'created_by_user_id' })
    createdByUser!: User;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;    constructor(
        title: string,
        description: string,
        address: string,
        price: number,
        available: boolean,
        landlordId: number,
        createdByUserId: number,
        photoBase64?: string,
        photoMimeType?: string,
        photoFileName?: string
    ) {
        this.title = title;
        this.description = description;
        this.address = address;
        this.price = price;
        this.available = available;
        this.landlordId = landlordId;
        this.createdByUserId = createdByUserId;
        this.photoBase64 = photoBase64;
        this.photoMimeType = photoMimeType;
        this.photoFileName = photoFileName;
    }

}