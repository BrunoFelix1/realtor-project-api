import { Router } from 'express';
import VisitController from '../controllers/VisitController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.use(authenticateToken);

// Listar visitas
router.get('/', VisitController.list);
// Buscar visita por id
router.get('/:id', VisitController.findById);
// Buscar visitas por cliente
router.get('/client/:clientId', VisitController.findByClient);
// Buscar visitas por imóvel
router.get('/property/:propertyId', VisitController.findByProperty);
// Buscar visitas por data
router.get('/date/:scheduledAt', VisitController.findByDate);
// Criar visita
router.post('/', VisitController.create);
// Atualizar visita
router.put('/:id', VisitController.update);
// Deletar visita
router.delete('/:id', VisitController.delete);

export default router;
