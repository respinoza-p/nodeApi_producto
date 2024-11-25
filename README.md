```markdown
# API REST con Node.js, Express y Swagger

Este proyecto es una API REST desarrollada con Node.js y Express que permite gestionar productos y usuarios. Incluye una documentación interactiva generada automáticamente con Swagger.

# URL de PRODUCCIÓN
API: https://nodeapi-producto.onrender.com/
DOC: https://nodeapi-producto.onrender.com/api-docs/

# POSTMAN
Se agrega en el proyecto la colección de servicios para invocar la API: UDD-BOOTCAMP-PROYECTO6.postman_collection.json

## Tabla de Contenidos

- [Características](#características)
- [Prerrequisitos](#prerrequisitos)
- [Instalación](#instalación)
- [Uso](#uso)
- [Documentación de la API](#documentación-de-la-api)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

## Características

- Gestión de productos (CRUD: Crear, Leer, Actualizar y Eliminar).
- Gestión de usuarios (registro, autenticación y actualización de información).
- Documentación de la API generada automáticamente con Swagger.
- Uso de middlewares como CORS y `express.json()`.

## Prerrequisitos

- [Node.js](https://nodejs.org/) (versión 14 o superior).
- [npm](https://www.npmjs.com/) (administrador de paquetes de Node.js).
- MongoDB para la base de datos (puede ser local o en la nube, como [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)).

## Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tuusuario/tu-repositorio.git
   cd tu-repositorio
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura las variables de entorno en un archivo `.env` en la raíz del proyecto. Ejemplo:
   ```env
   PORT=3000
   MONGO_URI=<completar con los datos de base de datos MONGO>
   ```

4. Inicia la aplicación:
   ```bash
   npm start
   ```

5. Accede a la aplicación en tu navegador:
   - API: [http://localhost:3000](http://localhost:3000)
   - Documentación de la API: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

## Uso

La API expone las siguientes rutas principales:

### Productos
- **GET** `/api/productos`: Listar todos los productos.
- **GET** `/api/productos/:id`: Obtener un producto por su ID.
- **POST** `/api/productos`: Crear un nuevo producto.
- **PUT** `/api/productos/:id`: Actualizar un producto existente.
- **DELETE** `/api/productos/:id`: Eliminar un producto.

### Usuarios
- **POST** `/api/usuarios`: Registrar un nuevo usuario.
- **PUT** `/api/usuarios/:id`: Actualizar un usuario existente.
- **DELETE** `/api/usuarios/:id`: Eliminar un usuario.
- **POST** `/api/usuarios/login`: Autenticar a un usuario.

## Documentación de la API

La documentación está disponible en la ruta `/api-docs` y se genera automáticamente con Swagger. Para acceder, abre [http://localhost:3000/api-docs](http://localhost:3000/api-docs) en tu navegador.

## Estructura del Proyecto

El proyecto sigue una estructura modular basada en carpetas para organizar el código de manera clara y escalable:

```plaintext
├── config/
│   └── db.js          # Configuración de conexión a la base de datos
├── controllers/
│   ├── productoController.js    # Lógica de negocio para productos
│   └── usuarioController.js     # Lógica de negocio para usuarios
├── middlewares/
│   └── authMiddleware.js        # Middleware para autenticación (si aplica)
├── models/
│   ├── Producto.js    # Esquema del modelo de Producto
│   └── Usuario.js     # Esquema del modelo de Usuario
├── routes/
│   ├── producto.js    # Rutas relacionadas con productos
│   └── usuario.js     # Rutas relacionadas con usuarios
├── .env               # Variables de entorno
├── index.js           # Punto de entrada de la aplicación
├── package.json       # Archivo de configuración del proyecto
└── README.md          # Documentación del proyecto
```
