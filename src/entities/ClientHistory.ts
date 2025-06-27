import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import Client from './Client';
import User from './User';

@Entity('client_history')
export default class ClientHistory {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ name: 'client_id' })
    clientId: number;

    @Column({ name: 'user_id' })
    userId: number;

    @Column({ type: 'varchar', length: 500 })
    action: string;

    @Column({ name: 'reference_id', nullable: true })
    referenceId?: number;

    @Column({ type: 'timestamp' })
    timestamp: Date;

    @ManyToOne(() => Client, { eager: false })
    @JoinColumn({ name: 'client_id' })
    client!: Client;

    @ManyToOne(() => User, { eager: false })
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @CreateDateColumn()
    createdAt!: Date;

    constructor(
        clientId: number,
        userId: number,
        action: string,
        timestamp: Date,
        referenceId?: number
    ) {
        this.clientId = clientId;
        this.userId = userId;
        this.action = action;
        this.timestamp = timestamp;
        this.referenceId = referenceId;
    }
}
