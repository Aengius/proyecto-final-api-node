import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); 

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  console.error('ERROR: La variable de entorno JWT_SECRET no está definida.');
  process.exit(1); // Sale de la aplicación si no se define la variable
}

const loginUser = async (email, password) => {
  console.log(`--- auth.service.js: Intentando login para ${email} ---`);

  // Simula una validación de credenciales.
  // En un caso real, esto buscaría el usuario en la DB y compararía la contraseña hasheada.
  if (email === 'test@example.com' && password === 'password123') {
    const user = { userId: 'user123', email: email };

    const token = jwt.sign(user, JWT_SECRET, { expiresIn: '1h' }); // Token expira en 1 hora

    return { user, token, message: 'Autenticación exitosa' };
  }
  return null;
};

export {
  loginUser
};