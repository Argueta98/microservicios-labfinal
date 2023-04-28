// Importamos el paquete express
const express = require("express");

// Creamos un objeto Router
const router = express.Router();

// Importamos el módulo data-Library que contiene los datos de los autores
const data = require("../../data/datos_perro");

// Creamos una función logger que muestra un mensaje en consola
const logger = (message) => console.log(`Perros Service: ${message}`);

// Creamos la ruta para obtener todos los perros
router.get("/", (req, res) => {
  
    // Creamos un objeto de respuesta con los datos del archivo JSON
    const response = {
      service: "perros",
      data: data,
    };
    // Enviamos la respuesta
    return res.json(response);
  });

//Obtener por id
  router.get("/:id",async (req, res) => {
    const reqId = req.params.id;
    const perroId = data.find((perro) => perro.Id === parseInt(reqId));

    const response = {
      service: "perros",
      data: perroId,
    };
    return res.json(response);
  });

//Obtener por el pais del dueño
  router.get("/paisCuidador/:pais", async (req, res) => {
   const duenio = req.params.pais;

    // Si se especifica un país, se filtran los perros según el país del dueño
   const pais = data.filter((perro)=> perro.pais_dueno === duenio)

    const response = {
      service: "perros",
      cantidad: pais.length,
      data: pais,
    };
  
    return res.json(response);
  });


module.exports = router;