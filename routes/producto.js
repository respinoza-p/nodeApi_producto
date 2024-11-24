const express = require("express");
const router = express.Router();
const productoController = require("../controllers/productoController");
const validateJWT = require("../middlewares/authMiddleware"); // Importar el middleware

// Rutas protegidas con el middleware
router.get("/",validateJWT, productoController.getProductos); // Obtener todos los productos
router.get("/:id",validateJWT, productoController.getProductoById); // Obtener un producto por ID
router.post("/",validateJWT, productoController.createProducto); // Crear un nuevo producto
router.put("/:id",validateJWT, productoController.updateProducto); // Actualizar un producto
router.delete("/:id",validateJWT, productoController.deleteProducto); // Eliminar un producto

module.exports = router;