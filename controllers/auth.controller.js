import * as authService from '../services/auth.service.js';

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log('--- auth.controller.js: Llamando a login ---', { email, password });

    if (!email || !password) {
      return res.status(400).json({ message: 'Se requiere email y contraseña.' });
    }

    const result = await authService.loginUser(email, password); // El servicio ahora devuelve { user, token } o null

    if (result && result.token) { // Verifica si result existe y tiene un token
      res.status(200).json({ message: 'Login exitoso', token: result.token }); // Devuelve solo el token
    } else {
      res.status(401).json({ message: 'Credenciales inválidas.' });
    }
  } catch (error) {
    console.error('Error en login (controller):', error);
    res.status(500).json({ message: 'Error interno del servidor al intentar iniciar sesión.' });
  }
};

export {
  login
};