import { DataSource } from 'typeorm';
import User from '../entities/user';
import Client from '../entities/Client';
import Property from '../entities/Property';
// vai adicioinando as entidades aqui conforme forem criadas
// isso aqui é só um exemplo pra voces configurarem o banco de dados de voces

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'seu_user',
    password: 'sua_senha_aqui',
    database: 'realtor_project',
    entities: [User, Client, Property], //lembrar de ir adicionando os arquivos de entdades aqui
    synchronize: true,
    logging: false
});