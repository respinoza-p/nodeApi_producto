const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Conexión a la base de datos
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/productos", require("./routes/producto"));
app.use("/api/usuarios", require("./routes/usuario"));

// Función para mostrar las URLs como enlaces en la consola
const showApiLinks = (port) => {
  console.log(`\nAPI disponible en las siguientes rutas:`);
  console.log(`- Productos (GET): http://localhost:${port}/api/productos`);
  console.log(`- Productos por ID (GET): http://localhost:${port}/api/productos/:id`);
  console.log(`- Productos (POST): http://localhost:${port}/api/productos`);
  console.log(`- Productos (PUT): http://localhost:${port}/api/productos/:id`);
  console.log(
    `- Productos (DELETE): http://localhost:${port}/api/productos/:id`
  );
  console.log(`- Usuarios (POST): http://localhost:${port}/api/usuarios`);
  console.log(`- Usuarios (PUT): http://localhost:${port}/api/usuarios/:id`);
  console.log(`- Usuarios (DELETE): http://localhost:${port}/api/usuarios/:id`);
  console.log(`- Usuarios (LOGIN): http://localhost:${port}/api/usuarios/login`);
};

// Iniciar el servidor y mostrar las rutas
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
  showApiLinks(PORT);
});