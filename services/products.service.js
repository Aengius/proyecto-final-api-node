import { db } from '../config/firebase.config.js'; // Importa la instancia de Firestore

const productsCollection = db.collection('products');

const getAllProducts = async () => {
  try {
    console.log('--- products.service.js: Obteniendo todos los productos de Firestore ---');
    const snapshot = await productsCollection.get(); 
    const products = snapshot.docs.map(doc => ({
      id: doc.id, // El ID del documento de Firestore
      ...doc.data() 
    }));
    return products;
  } catch (error) {
    console.error('Error al obtener todos los productos de Firestore:', error);
    throw new Error('No se pudieron obtener los productos.'); // Propaga el error para que el controlador lo maneje
  }
};

const getProductById = async (id) => {
  try {
    console.log(`--- products.service.js: Obteniendo producto con ID ${id} de Firestore ---`);
    const doc = await productsCollection.doc(id).get(); // Obtiene un documento por su ID
    if (!doc.exists) {
      return null; 
    }
    return { id: doc.id, ...doc.data() }; // Devuelve el producto con su ID y datos
  } catch (error) {
    console.error(`Error al obtener el producto con ID ${id} de Firestore:`, error);
    throw new Error(`No se pudo obtener el producto con ID ${id}.`);
  }
};

const createProduct = async (productData) => {
  try {
    console.log('--- products.service.js: Creando producto en Firestore ---', productData);
    // Firestore puede generar un ID automáticamente para el documento
    const docRef = await productsCollection.add(productData);
    return { id: docRef.id, ...productData }; // Devuelve el nuevo producto con el ID generado por Firestore
  } catch (error) {
    console.error('Error al crear el producto en Firestore:', error);
    throw new Error('No se pudo crear el producto.');
  }
};

const updateProduct = async (id, productData) => {
  try {
    console.log(`--- products.service.js: Actualizando producto con ID ${id} en Firestore ---`, productData);
    const docRef = productsCollection.doc(id);
    const doc = await docRef.get();
    if (!doc.exists) {
      return null; 
    }
    await docRef.update(productData); // Actualiza solo los campos proporcionados
    return { id: id, ...productData }; // Devuelve el ID y los datos actualizados
  } catch (error) {
      console.error(`Error al actualizar el producto con ID ${id} en Firestore:`, error);
      throw new Error(`No se pudo actualizar el producto con ID ${id}.`);
  }
};


const deleteProduct = async (id) => {
  try {
    console.log(`--- products.service.js: Eliminando producto con ID ${id} de Firestore ---`);
    const docRef = productsCollection.doc(id);
    const doc = await docRef.get(); // Verifica si el documento existe antes de eliminar
    if (!doc.exists) {
      return null;
    }
    await docRef.delete();
    return { message: `Producto con ID ${id} eliminado exitosamente.` };
  } catch (error) {
    console.error(`Error al eliminar el producto con ID ${id} de Firestore:`, error);
    throw new Error(`No se pudo eliminar el producto con ID ${id}.`);
  }
};

export {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};