const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema(
  {
    // Nombre del usuario, obligatorio, con longitud mínima y máxima
    nombre: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      minlength: [3, "El nombre debe tener al menos 3 caracteres"],
      maxlength: [50, "El nombre no puede exceder los 50 caracteres"],
    },
    // Email único y obligatorio con validación de formato
    email: {
      type: String,
      required: [true, "El email es obligatorio"],
      unique: true,
      match: [/.+\@.+\..+/, "El email debe tener un formato válido"],
    },
    // El password es obligatorio y debe tener un mínimo de 8 caracteres
    password: {
      type: String,
      required: [true, "El ingreso de una contraseña es obligartorio"],
      min: [8, "El largo de la contraseña debe ser almenos de 8 caracteres"],
    },
    // Fecha de registro, con valor predeterminado de la fecha actual
    fechaRegistro: {
      type: Date,
      default: Date.now,
    }
  },
  {
    // Añade campos de timestamps (createdAt y updatedAt)
    timestamps: true,
  }
);

const Usuario = mongoose.model("Usuario", usuarioSchema);
module.exports = Usuario;