const express = require("express");
const fetch = require("node-fetch");

//const User = require('../models/Users.js');
const premios = require('../../models/Premios.js');


const router = express.Router();

router.use(express.json());

router.get("/", async(req, res)=>{
    const premios = await premios.findAll();
    const response = {
        premios
    }
    res.send(response);
})

router.get("/:id", async(req, res)=>{
    const reqId = req.params.id;
    const premios = await premios.findOne({where: {id: reqId}});
    const response = {
        premios
    }
    res.send(response);
})



module.exports = router;