import express from 'express';
import cors from 'cors';
import { AppDataSource } from './config/data-source';
import authRoutes from './routes/Auth';
import userRoutes from './routes/User';
import clientRoutes from './routes/Client';
import propertyRoutes from './routes/Property';
import visitRoutes from './routes/Visit';
import clientHistoryRoutes from './routes/ClientHistory';
import rentalRoutes from './routes/Rental';

const app = express();
const PORT = process.env.PORT || 3000;

// configs de cors do server do express
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// definição das rotas-base da nossa api
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/properties', propertyRoutes);
app.use('/api/visits', visitRoutes);
app.use('/api/client-history', clientHistoryRoutes);
app.use('/api/rentals', rentalRoutes);



// conectando com o banco e iniciando o server na porta ali
AppDataSource.initialize()
  .then(() => {
    console.log('Banco de dados conectado com sucesso!');
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Erro ao conectar com o banco de dados:', error);
  });


