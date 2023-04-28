const express = require("express");
const fetch = require("node-fetch");

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
    const premios = await premiosData.findAll({where: {lugar: lugar}});
    const response = {
       cantidad: premios.length,
       data:  premios
    }
    res.send(response);
})

//Busqueda por el lugar obtenido
router.get("/puntaje/:puntaje", async(req, res)=>{
    const puntaje = req.params.puntaje;
    const premios = await premiosData.findAll({where: {puntaje: puntaje}});
    const response = {
       cantidad: premios.length,
       data:  premios
    }
    res.send(response);
})



module.exports = router;