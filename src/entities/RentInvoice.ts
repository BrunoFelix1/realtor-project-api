import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import Rental from './Rental';

@Entity('rent_invoices')
export default class RentInvoice {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'rental_id' })
    rentalId: number;

    @Column({ type: 'date' })
    dueDate: Date;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount: number;

    @Column({ type: 'enum', enum: ['pendente', 'pago', 'atrasado'], default: 'pendente' })
    status: 'pendente' | 'pago' | 'atrasado';

    @Column({ type: 'timestamp', nullable: true })
    paidAt?: Date;

    @ManyToOne(() => Rental, { eager: false })
    @JoinColumn({ name: 'rental_id' })
    rental!: Rental;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    constructor(
        rentalId: number,
        dueDate: Date,
        amount: number,
        status: 'pendente' | 'pago' | 'atrasado' = 'pendente',
        paidAt?: Date
    ) {
        this.rentalId = rentalId;
        this.dueDate = dueDate;
        this.amount = amount;
        this.status = status;
        this.paidAt = paidAt;
    }
}
