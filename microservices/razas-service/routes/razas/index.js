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

const RazasArray = [];

csvtojson({
    noheader: true,
    headers: ['id','raza','color_de_pelo','tamanio_de_pelo'
    ,'pais_de_origen','expectativa_de_vida','tipo','acreditado']
  })
  .fromFile(directoryPath)
  .then((jsonObject) => {

    for (let items in jsonObject) {
      jsonObject[items]['raza'] = jsonObject[items]['raza'].split(";");

      RazasArray.push(jsonObject[items]);
    }
  });

  // Creamos una función logger que muestra un mensaje en consola
  const logger = (message) => console.log(`Languages Service: ${message}`);

  router.get("/", (req, res) => {
    const response = {
      // crea una respuesta con información sobre los libros
      service: "razas",
      length: RazasArray.length,
      data: RazasArray,
    };
    return res.json(response); // devuelve la respuesta al cliente
  }); 


  //Buscar raza por id
  router.get("/:id", (req, res) => {
    const razaId = req.params.id;
    const raza = RazasArray.find((raza) => raza.id === razaId);
    if (!raza) {
      return res.status(404).json({
        message: "Raza no encontrada"
      });
    }
    const response = {
      service: "razas",
      data: raza
    };

    return res.json(response);
  }); 

   //Buscar raza por nombre
   router.get("/nombre/:name", (req, res) => {
    const razaName = req.params.name.toLowerCase();
    const raza = RazasArray.filter((raza) => raza.raza.map(name => name.toLowerCase()).includes(razaName))[0];
    if (!raza) {
      return res.status(404).json({
        message: "Raza no encontrada"
      });
    }
    const response = {
      service: "razas",
      data: raza
    };

    return res.json(response);
  }); 

  module.exports = router;