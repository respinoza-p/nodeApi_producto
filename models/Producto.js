const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema(
  {
    // Nombre del usuario, obligatorio, con longitud mínima y máxima
    nombre: {
      type: String,
      required: [true, "El nombre del producto es obligatorio"],
      minlength: [3, "El nombre debe tener al menos 3 caracteres"],
      maxlength: [100, "El nombre no puede exceder los 100 caracteres"],
    },
    // Descripción del producto, obligatorio, con longitud mínima y máxima
    descripcion: {
        type: String,
        required: [true, "La descrpción del producto es obligatorio"],
        minlength: [3, "El nombre debe tener al menos 3 caracteres"],
        maxlength: [200, "El nombre no puede exceder los 100 caracteres"],
    },
    // El precio es obligatorio y los valores son entre 1 y 500000
    precio: {
        type: Number,
        required: [true, "El precio es obligatorio"],
        min: [1, "El precio debe ser al menos 1"],
        max: [500000, "El precio no puede exceder los 500000"],
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

const Producto = mongoose.model("Producto", productoSchema);
module.exports = Producto;