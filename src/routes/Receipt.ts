import { Router } from 'express';
import ReceiptController from '../controllers/ReceiptController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.use(authenticateToken);

// Listar recibos
router.get('/', ReceiptController.list);
// Buscar recibo por id
router.get('/:id', ReceiptController.findById);
// Buscar recibo por rentInvoiceId
router.get('/invoice/:rentInvoiceId', ReceiptController.findByRentInvoice);
// Criar recibo
router.post('/', ReceiptController.create);
// Atualizar recibo
router.put('/:id', ReceiptController.update);
// Deletar recibo
router.delete('/:id', ReceiptController.delete);

export default router;
