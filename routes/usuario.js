const express = require("express");
const router = express.Router();
const usuarioController = require("../controllers/usuarioController");
const { verifyToken } = require("../middlewares/authMiddleware");

// Rutas para usuarios
router.post("/", usuarioController.createUsuario); // Crear un nuevo usuario
router.post("/login", usuarioController.getUsuarioByEmailAndPassword); // Iniciar sesión y obtener token
router.put("/:id", verifyToken, usuarioController.updateUsuario); // Actualizar un usuario por ID (requiere token)
router.delete("/:id", verifyToken, usuarioController.deleteUsuario); // Eliminar un usuario por ID (requiere token)

module.exports = router;