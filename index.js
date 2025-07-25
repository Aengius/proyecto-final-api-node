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


app.get('/', (req, res) => {
  res.send('¡Servidor Express para gestión de productos funcionando!');
});

app.use('/api', productsRoutes);
app.use('/auth', authRoutes); 

// === Middleware para manejar rutas no encontradas (404) ===
app.use((req, res, next) => {
  res.status(404).send({ message: 'Ruta no encontrada' });
});

// === Middleware para manejo de errores generales (500) ===
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Algo salió mal en el servidor.' });
});

// === Iniciar el Servidor (Solo para desarrollo local) ===
// Esta sección se comenta/elimina porque Vercel maneja el inicio del servidor
// al importar 'app' desde el archivo api/index.js
// Si querés probar localmente, puedes descomentar estas líneas y ejecutar `node index.js`
/*
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
  console.log('Presiona CTRL+C para detener el servidor');
});
*/

// === Exportar la aplicación Express para Vercel ===
// Esta línea es crucial para que Vercel pueda usar tu aplicación Express
export default app;