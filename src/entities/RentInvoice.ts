import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import Rental from './Rental';
import User from './User';

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

    @Column({ name: 'generated_by_user_id', nullable: true })
    generatedByUserId?: number;

    @ManyToOne(() => Rental, { eager: false })
    @JoinColumn({ name: 'rental_id' })
    rental!: Rental;

    @ManyToOne(() => User, { eager: false })
    @JoinColumn({ name: 'generated_by_user_id' })
    generatedByUser?: User;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    constructor(
        rentalId: number,
        dueDate: Date,
        amount: number,
        status: 'pendente' | 'pago' | 'atrasado' = 'pendente',
        paidAt?: Date,
        generatedByUserId?: number
    ) {
        this.rentalId = rentalId;
        this.dueDate = dueDate;
        this.amount = amount;
        this.status = status;
        this.paidAt = paidAt;
        this.generatedByUserId = generatedByUserId;
    }
}
