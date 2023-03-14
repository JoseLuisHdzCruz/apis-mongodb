const express= require("express");
const adminSchema = require("../models/admin");

const router = express.Router();

//create user
router.post("/admin", (req,res)=>{
    const admin = adminSchema(req.body);
    admin
        .save()
        .then((data) => res.json(data))
        .catch((error)=> res.json({message: error}))
})

//get all user
router.get("/admin", (req,res)=>{
    adminSchema
        .find()
        .then((data) => res.json(data))
        .catch((error)=> res.json({message: error}))
})

//get a user
router.get("/admin/:id", (req,res)=>{
    const {id} = req.params;
    adminSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error)=> res.json({message: error}))
})

//update a user
router.put("/admin/:id", (req,res)=>{
    const {id} = req.params;
    const {Nombre, ApPaterno, ApMaterno, Telefono, Correo, Cargo, Direccion, Usuario, Password} = req.body;
    adminSchema
        .updateOne({_id: id},{$set :{Nombre, ApPaterno, ApMaterno, Telefono, Correo, Cargo, Direccion,Usuario, Password}})
        .then((data) => res.json(data))
        .catch((error)=> res.json({message: error}))
})

//delete a user
router.delete("/admin/:id", (req,res)=>{
    const {id} = req.params;
    adminSchema
        .findByIdAndRemove({_id: id})
        .then((data) => res.json(data))
        .catch((error)=> res.json({message: error}))
})


module.exports = router;