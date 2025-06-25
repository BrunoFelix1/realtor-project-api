import { Router } from 'express';
import { register, login } from '../controllers/auth';

const router = Router();

// rotas públicas essas ai, as outras a gente usa o middleware de autenticação pra proteger
router.post('/register', register);
router.post('/login', login);

export default router;
