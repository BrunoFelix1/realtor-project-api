import { Router } from 'express';
import ClientController from '../controllers/ClientController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.use(authenticateToken);

// Listar clientes
router.get('/', ClientController.list);
// Buscar cliente por email
router.get('/email/:email', ClientController.findByEmail);
// Buscar cliente por nome
router.get('/name/:name', ClientController.findByName);
// Buscar cliente por id
router.get('/:id', ClientController.findById);
// Buscar cliente por documento
router.get('/document/:document', ClientController.findByDocument);
// Criar cliente
router.post('/', ClientController.create);
// Atualizar cliente
router.put('/:id', ClientController.update);
// Deletar cliente
router.delete('/:id', ClientController.delete);

export default router;
