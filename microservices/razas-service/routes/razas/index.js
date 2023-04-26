// Importamos el paquete express
const express = require("express");

// Creamos un objeto Router
const router = express.Router();

// Inportamos el Path de csvtojson
const path = require('path');
const csvPath = '../../data/raza_info.csv';
const directoryPath = path.join(__dirname, csvPath);
console.log(directoryPath);
const csvtojson = require('csvtojson');

const LanguageArray = [];

csvtojson({
    noheader: true,
    headers: ['id','raza','color_de_pelo','tamanio_de_pelo'
    ,'pais_de_origen','expectativa_de_vida','tipo','acreditado']
  })
  .fromFile(directoryPath)
  .then((jsonObject) => {

    for (let items in jsonObject) {
      jsonObject[items]['raza'] = jsonObject[items]['raza'].split(";");

      LanguageArray.push(jsonObject[items]);
    }
  });

  // Creamos una función logger que muestra un mensaje en consola
  const logger = (message) => console.log(`Languages Service: ${message}`);

  router.get("/", (req, res) => {
    const response = {
      // crea una respuesta con información sobre los libros
      service: "razas",
      length: LanguageArray.length,
      data: LanguageArray,
    };
    logger("Get razas data"); // registra un mensaje en los registros
    return res.json(response); // devuelve la respuesta al cliente
  }); 

  module.exports = router;