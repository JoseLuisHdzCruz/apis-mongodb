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


//********************************************************************************** */
//obtener estado de puerta
router.get("/estPuerta/:id", (req,res)=>{
    const {id} = req.params;
    prototypeSchema
        .find({_id:id}, {estPuerta: 1, _id: 0})
        .then((data) => res.json(data))
        .catch((error)=> res.json({message: error}))
})

//obtener valor del porton
router.get("/estPorton/:id", (req,res)=>{
    const {id} = req.params;
    prototypeSchema
        .find({_id:id}, {estPorton: 1, _id: 0})
        .then((data) => res.json(data))
        .catch((error)=> res.json({message: error}))
})

//obtener valor del servo
router.get("/valPuerta/:id", (req,res)=>{
    const {id} = req.params;
    prototypeSchema
        .find({_id:id}, {servo: 1, _id: 0})
        .then((data) => res.json(data))
        .catch((error)=> res.json({message: error}))
})

//actualizar valor del servo
router.put("/valPuerta/:id", (req,res)=>{
    const {id} = req.params;
    const {servo} = req.body;
    prototypeSchema
        .updateOne({_id: id},{$set :{servo}})
        .then((data) => res.json(data))
        .catch((error)=> res.json({message: error}))
})

router.put("/valPorton/:id", (req,res)=>{
    const {id} = req.params;
    const {estPorton} = req.body;
    prototypeSchema
        .updateOne({_id: id},{$set :{estPorton}})
        .then((data) => res.json(data))
        .catch((error)=> res.json({message: error}))
})

router.get("/recibe/:id", (req,res)=>{
    const {id} = req.params;
    prototypeSchema
        .find({_id:id}, {estPuerta: 1, _id: 0})
        .then((data) => res.json(data))
        .catch((error)=> res.json({message: error}))
})


//********************************************************************************** */


module.exports = router;