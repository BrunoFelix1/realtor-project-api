import { Router } from 'express';
import PropertyController from '../controllers/PropertyController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.use(authenticateToken);

// Listar imóveis
router.get('/', PropertyController.list);
// Buscar imóvel por id
router.get('/:id', PropertyController.findById);
// Buscar imóveis por título
router.get('/title/:title', PropertyController.findByTitle);
// Buscar imóveis por proprietário
router.get('/landlord/:landlordId', PropertyController.findByLandlord);
// Buscar imóveis disponíveis
router.get('/available', PropertyController.findAvailable);
// Criar imóvel
router.post('/', PropertyController.create);
// Atualizar imóvel
router.put('/:id', PropertyController.update);
// Deletar imóvel
router.delete('/:id', PropertyController.delete);

export default router;
