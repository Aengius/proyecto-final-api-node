import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import dotenv from 'dotenv';

dotenv.config();

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT); 

initializeApp({
  credential: cert(serviceAccount)
});

const db = getFirestore();

console.log('Firebase Admin SDK inicializado y Firestore conectado.');

export { db };