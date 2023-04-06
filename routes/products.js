const express= require("express");
const productSchema = require("../models/products");
const upload = require("../libs/storage");

const router = express.Router();


async function addProduct (req,res){
    const product = productSchema(req.body);

    if(req.file){
        const {filename} = req.file;
        product.setImagen(filename);
    }

    product
        .save()
        .then((data) => res.json(data))
        .catch((error)=> res.json({message: error}))
}
router.post('/product', upload.single('Imagen'), addProduct)



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

//*************  Actualizar  **************************** */

// router.put("/product/:id", upload.single('Imagen'), (req,res)=>{
//     const {id} = req.params;
//     const {Producto, Descripcion, Precio, Stock} = req.body;
//     const Imagen = productSchema.setImagen(req.file.Imagen);

//         productSchema
//         .updateOne({_id: id},{$set :{Producto, Descripcion, Precio, Stock, Imagen}})
//         .then((data) => res.json(data))
//         .catch((error)=> res.json({message: error}))
// })


router.put("/product/:id", (req,res)=>{
    const {id} = req.params;
    const {Producto, Descripcion, Precio, Stock} = req.body;
    productSchema
        .updateOne({_id: id},{$set :{Producto, Descripcion, Precio, Stock}})
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


router.get("/productA", (req,res)=>{
    productSchema
        .aggregate([{ $sample: { size: 3 } }])
        .then((data) => res.json(data))
        .catch((error)=> res.json({message: error}))
})


module.exports = router;
