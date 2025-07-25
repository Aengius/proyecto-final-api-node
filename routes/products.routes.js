import { Router } from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
} from '../controllers/products.controller.js';
import { authenticateToken } from '../middlewares/auth.middleware.js'; 

const router = Router(); 

// Rutas públicas (no requieren token)
router.get('/products', getProducts);
router.get('/products/:id', getProductById);

// Rutas protegidas (requieren un token JWT válido)
router.post('/products/create', authenticateToken, createProduct);
router.delete('/products/:id', authenticateToken, deleteProduct);

export default router; 