// Importa el módulo express
const express = require("express");

// Importa las rutas del recurso books
const premios = require("../routes/premios");

// Crea una instancia de la aplicación express
const app = express();

// Agrega el middleware para manejar las solicitudes HTTP que llegan a la ruta "/api/v2/premios",
// enviándolas al enrutador de "premios" definido en el archivo "routes/premios.js".
app.use("/api/v2/premios", premios);

// Exporta la aplicación express para que pueda ser utilizada por otros módulos
module.exports = app;
