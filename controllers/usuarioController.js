const bcryptjs = require("bcryptjs");
const Usuario = require("../models/Usuario");

// Crear un nuevo usuario
exports.createUsuario = async (req, res) => {
  try {

    // Encriptar la contraseña antes de crear el usuario
    if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const usuario = new Usuario(req.body);
    const nuevoUsuario = await usuario.save();
    console.log(`Nuevo usuario creado: ${nuevoUsuario.nombre}`);
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar un usuario
exports.updateUsuario = async (req, res) => {
  try {
    // Encriptar la contraseña antes de actualizar el usuario
    if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Eliminar un usuario
exports.deleteUsuario = async (req, res) => {
  try {
    const usuarioEliminado = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuarioEliminado) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    console.log(`Usuario eliminado: ${usuarioEliminado.nombre}`);
    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};