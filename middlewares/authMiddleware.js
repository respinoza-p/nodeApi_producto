const jwt = require("jsonwebtoken");

// Middleware para validar el token JWT
exports.verifyToken = (req, res, next) => {
  const token = req.header("Authorization"); // Leer el token del encabezado Authorization
  if (!token) {
    return res.status(401).json({ message: "Acceso denegado. No se proporcionó un token." });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET); // Verificar el token
    req.user = verified; // Almacenar la información decodificada en req.user
    next(); // Continuar con el siguiente middleware o controlador
  } catch (error) {
    res.status(400).json({ message: "Token inválido." });
  }
};