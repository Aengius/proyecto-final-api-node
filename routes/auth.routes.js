import { Router } from 'express';
// Importa la función de login del controlador de autenticación
import { login } from '../controllers/auth.controller.js';

const router = Router();

// Ruta para el login de usuarios
router.post('/login', login);

export default router;