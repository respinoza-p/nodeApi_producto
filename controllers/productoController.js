const Producto = require("../models/Producto");

// Obtener todos los productos
exports.getProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Obtener un producto por ID
exports.getProductoById = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(producto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Crear un nuevo producto
exports.createProducto = async (req, res) => {
  try {
    const producto = new Producto(req.body);
    const nuevoProducto = await producto.save();
    console.log(
      `Nuevo producto creada: ${nuevoProducto.nombre}, Precio: ${nuevoProducto.precio}`
    );
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar un producto
exports.updateProducto= async (req, res) => {
  try {
    const producto = await Producto.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    console.log(`producto actualizado: ${producto.nombre}`);
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrada" });
    }
    res.json(producto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un producto
exports.deleteProducto = async (req, res) => {
  try {
    const productoEliminado = await Producto.findByIdAndDelete(req.params.id);
    if (!productoEliminado) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    console.log(`Producto eliminado: ${productoEliminado.nombre}`);
    res.json({ message: "Procucto eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};