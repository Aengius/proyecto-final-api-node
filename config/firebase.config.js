import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import dotenv from 'dotenv';
// import path from 'path'; // Comentada: ya no se usa path para la ruta del JSON
// import { fileURLToPath } = 'url'; // Comentada: ya no se usa para la ruta del JSON

dotenv.config();

// Las siguientes líneas son comentadas/eliminadas porque ya no necesitamos leer el archivo JSON desde una ruta local
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH; // Comentada

// if (!serviceAccountPath) { // Comentado: esta verificación ya no es necesaria
//   console.error('ERROR: La variable de entorno FIREBASE_SERVICE_ACCOUNT_PATH no está definida.');
//   process.exit(1);
// }

// MODIFICACIÓN CLAVE: Ahora Firebase Admin SDK leerá el JSON directamente de la variable de entorno
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT); // <--- ¡Esta es la nueva línea!

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

console.log('Firebase Admin SDK inicializado y Firestore conectado.');

export { db };