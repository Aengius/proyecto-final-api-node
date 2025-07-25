import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv'; 
import productsRoutes from './routes/products.routes.js';
import authRoutes from './routes/auth.routes.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());
app.use(bodyParser.json());

// === Rutas de Prueba (temporal) ===
// Una ruta GET simple para verificar que el servidor está funcionando.
app.get('/', (req, res) => {
  res.send('¡Servidor Express para gestión de productos funcionando!');
});

// === Rutas de la API ===
app.use('/api', productsRoutes);
app.use('/auth', authRoutes)

// === Middleware para manejar rutas no encontradas (404) ===
app.use((req, res, next) => {
  res.status(404).send({ message: 'Ruta no encontrada' });
});

// === Middleware para manejo de errores generales (500) ===
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Algo salió mal en el servidor.' });
});


// === Iniciar el Servidor ===
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
  console.log('Presiona CTRL+C para detener el servidor');
});