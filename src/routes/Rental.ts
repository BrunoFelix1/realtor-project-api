import { Router } from 'express';
import RentalController from '../controllers/RentalController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.use(authenticateToken);

// Listar aluguéis
router.get('/', RentalController.list);
// Buscar aluguel por id
router.get('/:id', RentalController.findById);
// Buscar aluguéis por imóvel
router.get('/property/:propertyId', RentalController.findByProperty);
// Buscar aluguéis por inquilino
router.get('/tenant/:tenantId', RentalController.findByTenant);
// Buscar aluguéis ativos
router.get('/active', RentalController.findActive);
// Criar aluguel
router.post('/', RentalController.create);
// Atualizar aluguel
router.put('/:id', RentalController.update);
// Deletar aluguel
router.delete('/:id', RentalController.delete);

export default router;
