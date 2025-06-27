import { Router } from 'express';
import ClientHistoryController from '../controllers/ClientHistoryController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.use(authenticateToken);

// Listar histórico
router.get('/', ClientHistoryController.list);
// Buscar histórico por id
router.get('/:id', ClientHistoryController.findById);
// Buscar histórico por cliente
router.get('/client/:clientId', ClientHistoryController.findByClient);
// Buscar histórico por usuário
router.get('/user/:userId', ClientHistoryController.findByUser);
// Criar histórico
router.post('/', ClientHistoryController.create);

export default router;
