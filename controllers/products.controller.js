import * as productService from '../services/products.service.js'; 
const getProducts = async (req, res) => {
  try {
    console.log('--- products.controller.js: Llamando a getProducts ---');
    const products = await productService.getAllProducts();
    res.status(200).json(products); 
  } catch (error) {
    console.error('Error en getProducts (controller):', error);
    res.status(500).json({ message: 'Error interno del servidor al obtener productos.' });
  }
};

// Controlador para obtener un producto por ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params; 
    console.log(`--- products.controller.js: Llamando a getProductById para ID: ${id} ---`);
    const product = await productService.getProductById(id);
    if (product) {
      res.status(200).json(product); // Si se encuentra, envía el producto
    } else {
      res.status(404).json({ message: `Producto con ID ${id} no encontrado.` }); // Si no se encuentra, 404
    }
  } catch (error) {
    console.error('Error en getProductById (controller):', error);
    res.status(500).json({ message: 'Error interno del servidor al obtener el producto.' });
  }
};

// Controlador para crear un nuevo producto
const createProduct = async (req, res) => {
  try {
    const productData = req.body;
    console.log('--- products.controller.js: Llamando a createProduct ---', productData);

    if (!productData.title || !productData.price || !productData.category) {
      return res.status(400).json({ message: 'Faltan campos obligatorios: title, price, category.' });
    }

    const newProduct = await productService.createProduct(productData);
    res.status(201).json({ message: 'Producto creado exitosamente', product: newProduct }); // 201 Created para creación exitosa
  } catch (error) {
    console.error('Error en createProduct (controller):', error);
    res.status(500).json({ message: 'Error interno del servidor al crear el producto.' });
  }
};

// Controlador para eliminar un producto
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params; // Obtiene el ID de los parámetros de la URL
    console.log(`--- products.controller.js: Llamando a deleteProduct para ID: ${id} ---`);
    const result = await productService.deleteProduct(id);
    if (result) {
      res.status(200).json({ message: `Producto con ID ${id} eliminado exitosamente.` });
    } else {
      res.status(404).json({ message: `Producto con ID ${id} no encontrado para eliminar.` });
    }
  } catch (error) {
    console.error('Error en deleteProduct (controller):', error);
    res.status(500).json({ message: 'Error interno del servidor al eliminar el producto.' });
  }
};

export {
  getProducts,
  getProductById,
  createProduct,
  deleteProduct,
};