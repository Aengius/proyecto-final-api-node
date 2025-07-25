import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;

if (!serviceAccountPath) {
  console.error('ERROR: La variable de entorno FIREBASE_SERVICE_ACCOUNT_PATH no está definida.');
  process.exit(1); // Sale de la aplicación si no se define la variable
}

const serviceAccount = path.resolve(__dirname, '..', serviceAccountPath);

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

console.log('Firebase Admin SDK inicializado y Firestore conectado.');

export { db };