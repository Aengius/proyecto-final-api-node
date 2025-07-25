import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); 
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error('ERROR: JWT_SECRET no definido en el middleware de autenticación.');
  process.exit(1); 
}

const authenticateToken = (req, res, next) => {
  // 1. Obtener el token de la cabecera de autorización
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Esperamos "Bearer TOKEN"

  if (token == null) {
    // Si no hay token, no autorizado
    return res.status(401).json({ message: 'Acceso denegado. No se proporcionó token de autenticación.' });
  }

  // 2. Verificar el token
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      // Si el token no es válido (ej. expirado, corrupto, secreto incorrecto)
      console.error('Error de verificación de token:', err.message);
      return res.status(403).json({ message: 'Token de autenticación inválido o expirado.' });
    }
    // Si el token es válido, adjuntamos los datos del usuario decodificados a la petición
    req.user = user;
    next(); 
  });
};

export {
  authenticateToken
};