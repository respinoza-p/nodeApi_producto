const jwt = require("jsonwebtoken");

const validateJWT = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Acceso denegado. Token no proporcionado." });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Decodificar el token y almacenarlo en `req.user`
    next();
  } catch (error) {
    res.status(400).json({ message: "Token inválido." });
  }
};

module.exports = validateJWT;