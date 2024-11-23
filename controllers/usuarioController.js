const bcryptjs = require("bcryptjs");
const Usuario = require("../models/Usuario");

// Crear un nuevo usuario
exports.createUsuario = async (req, res) => {
  try {

    // Encriptar la contraseña antes de crear el usuario
    if (req.body.password) {
        const salt = await bcryptjs.genSalt(10);
        req.body.password = await bcryptjs.hash(req.body.password, salt);
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

// Obtener un usuario por email y verificar la contraseña
exports.getUsuarioByEmailAndPassword = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // Verificar si el usuario existe
      const usuario = await Usuario.findOne({ email });
      if (!usuario) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }
  
      // Comparar la contraseña
      const isMatch = await bcryptjs.compare(password, usuario.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Contraseña incorrecta" });
      }
  
      // Retornar el usuario (sin la contraseña)
      const { password: _, ...usuarioSinPassword } = usuario.toObject();
      res.status(200).json(usuarioSinPassword);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };