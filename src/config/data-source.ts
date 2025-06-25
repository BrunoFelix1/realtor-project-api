import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import User from '../entities/User';
import Client from '../entities/Client';
import Property from '../entities/Property';
import Visit from '../entities/Visit';
import Rental from '../entities/Rental';
import RentInvoice from '../entities/RentInvoice';
import Receipt from '../entities/Receipt';
import ClientHistory from '../entities/ClientHistory';

dotenv.config();

export const AppDataSource = new DataSource({
    type: process.env.DB_TYPE as 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [User, Client, Property, Visit, Rental, RentInvoice, Receipt, ClientHistory],
    synchronize: true,
    logging: false
});