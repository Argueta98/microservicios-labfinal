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
   router.get("/raza/:name", (req, res) => {
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

  //Buscar raza por nombre de pais
  router.get("/pais/:pais", (req, res) => {
    const pais = req.params.pais.toLowerCase();
    const raza = RazasArray.filter(raza => raza.pais_de_origen.toLowerCase() === pais);
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

  //Buscar por raza por tipo
  router.get("/tipo/:tipo", (req, res) => {
    const tipo = req.params.tipo.toLowerCase();
    const razas = RazasArray.filter((raza) => raza.tipo.toLowerCase() === tipo);
    if (razas.length === 0) {
      return res.status(404).json({
        message: "No se encontraron razas con el tipo especificado."
      });
    }
    const response = {
      service: "razas",
      cantidad: razas.length,
      data: razas
    };
    return res.json(response);
  });


  //Expectativa de vida
  router.get("/expectativa/expectativa-de-vida", (req, res) => {
    const sortedData = RazasArray.sort((a, b) => b.expectativa_de_vida - a.expectativa_de_vida);
    const response = {
      service: "razas",
      data: sortedData
    };
    res.json(response);
  });

/*
  // Buscar perro y premios por raza
router.get("/BuscarRaza/:name", async (req, res) => {
  try {
    const razaName = req.params.name.toLowerCase();

    // Buscar la raza por nombre
    const raza = RazasArray.filter((raza) => raza.raza.map(name => name.toLowerCase()).includes(razaName))[0];
    if (!raza) {
      return res.status(404).json({
        message: "Raza no encontrada"
      });
    }

    // Obtener información del perro
    const perroResponse = await fetch(`http://perros:3000/api/v2/perros/raza/${raza.raza}`);
    const perro = await perroResponse.json();

    // Obtener premios del perro me dio un problema de logica
    const premiosResponse = await fetch(`http://premios:4000/api/v2/premios/campeonId/${perro.data.Id}`);
    const premios = await premiosResponse.json();

    const response = {
      service: "perros_con_premios",
      data: {
        perro: perro,
        premios: premios
      // raza: raza
      },
    };

    return res.json(response);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error al obtener información del perro y sus premios" });
  }
}); */


  module.exports = router;