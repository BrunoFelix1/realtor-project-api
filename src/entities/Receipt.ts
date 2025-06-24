import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from 'typeorm';
import RentInvoice from './RentInvoice';

@Entity('receipts')
export default class Receipt {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'rent_invoice_id' })
    rentInvoiceId: number;

    @Column({ type: 'timestamp' })
    issuedAt: Date;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    commissionValue: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    taxValue: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    totalValue: number;

    @OneToOne(() => RentInvoice, { eager: false })
    @JoinColumn({ name: 'rent_invoice_id' })
    rentInvoice!: RentInvoice;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    constructor(
        rentInvoiceId: number,
        issuedAt: Date,
        commissionValue: number,
        taxValue: number,
        totalValue: number
    ) {
        this.rentInvoiceId = rentInvoiceId;
        this.issuedAt = issuedAt;
        this.commissionValue = commissionValue;
        this.taxValue = taxValue;
        this.totalValue = totalValue;
    }
}
