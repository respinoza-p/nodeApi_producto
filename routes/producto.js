const express = require("express");
const router = express.Router();
const productoController = require("../controllers/productoController");

// GET: Obtener todas los productos
router.get("/", productoController.getProductos);

// GET: Obtener un producto por ID
router.get("/:id", productoController.getProductoById);

// POST: Crear un nuevo producto
router.post("/", productoController.createProducto);

// PUT: Actualizar un producto
router.put("/:id", productoController.updateProducto);

// DELETE: Eliminar un producto
router.delete("/:id", productoController.deleteProducto);

module.exports = router;