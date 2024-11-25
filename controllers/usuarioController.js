const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
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

    // Convertir el objeto a un JSON y eliminar la contraseña antes de enviarlo
    const { password, ...usuarioSinPassword } = nuevoUsuario.toObject();

    console.log(`Nuevo usuario creado: ${usuarioSinPassword.nombre}`);

    res.status(201).json(usuarioSinPassword);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Actualizar un usuario
exports.updateUsuario = async (req, res) => {
  try {
    // Encriptar la contraseña antes de actualizar el usuario
    if (req.body.password) {
        const salt = await bcryptjs.genSalt(10);
        req.body.password = await bcryptjs.hash(req.body.password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!usuario) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    // Convertir el objeto a un JSON y eliminar la contraseña antes de enviarlo
    const { password, ...usuarioSinPassword } = usuario.toObject();

    console.log(`Usuario actualizado correctamente: ${usuarioSinPassword.nombre}`);
    
    res.status(201).json(usuarioSinPassword);
    
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
    
    //Se firma el TOKEN y se asigna un tiempo
    const token = jwt.sign({ email, password }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    //Regresa el token
    res.json({ token });    

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  //Verificar si el token de la sesión es válido
  exports.verifyToken = (req, res) => {
    try {
      // Obtener el token del encabezado Authorization
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token no proporcionado o inválido" });
      }
  
      // Extraer el token
      const token = authHeader.split(" ")[1];
  
      // Verificar el token
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          return res.status(403).json({ message: "Token inválido o expirado" });
        }
  
        // Responder con el contenido del token decodificado
        res.status(200).json({ message: "Token válido", user: decoded });
      });
    } catch (error) {
      res.status(500).json({ message: "Error al procesar el token" });
    }
  };