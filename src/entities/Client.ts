
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import Property from './Property';

@Entity('clients')
export default class Client {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'varchar', length: 255, unique: true })
    email: string;

    @Column({ type: 'varchar', length: 20 })
    phone: string;

    @Column({ type: 'enum', enum: ['locador', 'locatario'] })
    type: 'locador' | 'locatario';

    @Column({ type: 'varchar', length: 20, unique: true })
    document: string;

    @OneToMany(() => Property, property => property.landlord)
    properties!: Property[];

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    constructor(name: string, email: string, phone: string, type: 'locador' | 'locatario', document: string) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.type = type;
        this.document = document;
    }
}