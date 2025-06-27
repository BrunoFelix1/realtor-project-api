import { Router } from 'express';
import { register, login } from '../controllers/AuthController';

const router = Router();
// essas sao as unicas rotas nao autenticadas pelo middleware
router.post('/register', register);
router.post('/login', login);

export default router;
