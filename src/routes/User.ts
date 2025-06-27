import { Router } from 'express';
import UserController from '../controllers/UserController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.use(authenticateToken);

// Listar usuários
router.get('/', UserController.list);
// Buscar usuário por email
router.get('/email/:email', UserController.findByEmail);
// Buscar usuário por nome
router.get('/name/:name', UserController.findByName);
// Criar usuário
router.post('/', UserController.create);
// Atualizar usuário
router.put('/:id', UserController.update);
// Deletar usuário
router.delete('/:id', UserController.delete);

export default router;
