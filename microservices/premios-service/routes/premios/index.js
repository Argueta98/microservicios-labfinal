const express = require("express");
const fetch = require("node-fetch");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const premiosData = require('../../models/Premios.js'); //llamo al modelo creado

const router = express.Router();

router.use(express.json());

//Busqueda por todos
router.get("/", async(req, res)=>{
    const premios = await premiosData.findAll();
    const response = {
        premios
    }
    res.send(response);
})


//Busuqeda por ID
router.get("/:id", async(req, res)=>{
    const reqId = req.params.id;
    const premios = await premiosData.findOne({where: {id: reqId}});
    const response = {
        premios
    }
    res.send(response);
})

//Busqueda por el lugar obtenido
router.get("/lugar/:lugar", async(req, res)=>{
    const lugar = req.params.lugar;
   // const premios = await premiosData.findAll({where: {lugar: lugar}});
    const response = {
       cantidad: premios.length,
       data:  premios
    }
    res.send(response);
})

//Busqueda por el puntaje obtenido
router.get("/puntaje/:puntaje", async(req, res)=>{
    const puntaje = req.params.puntaje;
    const premios = await premiosData.findAll({where: {puntaje: puntaje}});
    const response = {
       cantidad: premios.length,
       data:  premios
    }
    res.send(response);
})

//Busqueda por campeon  id
router.get("/campeonId/:id", async(req, res)=>{
    const campeonId = req.params.id;
    const premios = await premiosData.findAll({where: {id_campeon: campeonId}});
    const response = {
       cantidad: premios.length,
       data:  premios
    }
    res.send(response);
})

//Busqueda por anio de campeonato
router.get("/anio/:anio", async(req, res)=>{
    const anio = req.params.anio;
    const premios = await premiosData.findAll({where: {anio_campeonato: anio}});
    const response = {
       cantidad: premios.length,
       data:  premios
    }
    res.send(response);
})

//Busqueda por anio de campeonato
router.get("/pais/:pais", async(req, res)=>{
    const pais = req.params.pais;
    const premios = await premiosData.findAll({where: {pais_competencia: pais}});
    const response = {
       cantidad: premios.length,
       data:  premios
    }
    res.send(response);
})

//Busqueda por categoria ganada de campeonato
router.get("/categoria/:categoria", async(req, res)=>{
    const categoria = req.params.categoria;
    const premios = await premiosData.findAll({where: {categoria_ganada: categoria}});
    const response = {
       cantidad: premios.length,
       data:  premios
    }
    res.send(response);
})


//Busqueda por rango de anios de campeonato
router.get("/anios/:inicio/:fin", async(req, res)=>{
    const inicio = parseInt(req.params.inicio) ;
    const fin = parseInt(req.params.fin);
    const premios = await premiosData.findAll({where: {anio_campeonato: {[Op.between]: [inicio, fin]}}});
    const response = {
       cantidad: premios.length,
       data:  premios
    }
    res.send(response);
})





module.exports = router;