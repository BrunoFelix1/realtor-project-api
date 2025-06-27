import { Router } from 'express';
import RentInvoiceController from '../controllers/RentInvoiceController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.use(authenticateToken);

// Listar faturas
router.get('/', RentInvoiceController.list);
// Buscar fatura por id
router.get('/:id', RentInvoiceController.findById);
// Buscar faturas por aluguel
router.get('/rental/:rentalId', RentInvoiceController.findByRental);
// Buscar faturas por mês/ano
router.get('/monthyear/:month/:year', RentInvoiceController.findByMonthYear);
// Criar fatura
router.post('/', RentInvoiceController.create);
// Atualizar fatura
router.put('/:id', RentInvoiceController.update);
// Deletar fatura
router.delete('/:id', RentInvoiceController.delete);

export default router;
