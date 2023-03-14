const express= require("express");
const prototypeSchema = require("../models/prototype");

const router = express.Router();

//create user
router.post("/prototype", (req,res)=>{
    const prototype = prototypeSchema(req.body);
    prototype
        .save()
        .then((data) => res.json(data))
        .catch((error)=> res.json({message: error}))
})

//get all user
router.get("/prototype", (req,res)=>{
    prototypeSchema
        .find()
        .then((data) => res.json(data))
        .catch((error)=> res.json({message: error}))
})

//get a user
router.get("/prototype/:id", (req,res)=>{
    const {id} = req.params;
    prototypeSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error)=> res.json({message: error}))
})

//update a user
router.put("/prototype/:id", (req,res)=>{
    const {id} = req.params;
    const {tarjeta,estPuerta, estPorton} = req.body;
    prototypeSchema
        .updateOne({_id: id},{$set :{tarjeta, estPuerta, estPorton}})
        .then((data) => res.json(data))
        .catch((error)=> res.json({message: error}))
})

//delete a user
router.delete("/prototype/:id", (req,res)=>{
    const {id} = req.params;
    prototypeSchema
        .findByIdAndRemove({_id: id})
        .then((data) => res.json(data))
        .catch((error)=> res.json({message: error}))
})


module.exports = router;