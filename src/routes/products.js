const express= require("express");
const productSchema = require("../models/products");

const router = express.Router();

//create user
router.post("/product", (req,res)=>{
    const product = productSchema(req.body);
    product
        .save()
        .then((data) => res.json(data))
        .catch((error)=> res.json({message: error}))
})

//get all user
router.get("/product", (req,res)=>{
    productSchema
        .find()
        .then((data) => res.json(data))
        .catch((error)=> res.json({message: error}))
})

//get a user
router.get("/product/:id", (req,res)=>{
    const {id} = req.params;
    productSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error)=> res.json({message: error}))
})

//update a user
router.put("/product/:id", (req,res)=>{
    const {id} = req.params;
    const {Producto, Descripcion, Precio, Stock, Imagen} = req.body;
    productSchema
        .updateOne({_id: id},{$set :{Producto, Descripcion, Precio, Stock, Imagen}})
        .then((data) => res.json(data))
        .catch((error)=> res.json({message: error}))
})

//delete a user
router.delete("/product/:id", (req,res)=>{
    const {id} = req.params;
    productSchema
        .findByIdAndRemove({_id: id})
        .then((data) => res.json(data))
        .catch((error)=> res.json({message: error}))
})


module.exports = router;