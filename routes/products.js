const express= require("express");
const productSchema = require("../models/products");
const parser = require("../libs/cloudinary")

const router = express.Router();

  //*************  Agregar producto  **************************** */
  router.post('/product', parser.single('Imagen'), async (req, res) => {
    try {
      const { Producto, Descripcion, Precio, Stock } = req.body;

      // Crear un nuevo producto
      const product = new productSchema({
        Producto,
        Descripcion,
        Precio,
        Stock,
        Imagen:req.file.path
      });

      // Guardar el producto en la base de datos
      await product.save();
  
      res.send({ message: 'Producto creado correctamente' });
    } catch (err) {
      console.error(err);
      res.status(500).send({ message: 'Error al crear el producto' });
    }
  });

//*************  Obtener productos  **************************** */
router.get("/product", (req,res)=>{
    productSchema
        .find()
        .then((data) => res.json(data))
        .catch((error)=> res.json({message: error}))
})

//*************  Obtener producto en especifico  **************************** */
router.get("/product/:id", (req,res)=>{
    const {id} = req.params;
    productSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error)=> res.json({message: error}))
})

//*************  Actualizar producto  **************************** */

router.put('/product/:id', parser.single('Imagen'), async (req, res) => {
  try {
    const { Producto, Descripcion, Precio, Stock } = req.body;
    const { id } = req.params;
    let updateFields = {
      Producto,
      Descripcion,
      Precio,
      Stock
    };
  
    // Actualizar imagen en Cloudinary si se envió una nueva imagen
    if (req.file) {
      updateFields.Imagen = req.file.path;
    }

    // Actualizar producto en la base de datos
    const updatedProduct = await productSchema.findByIdAndUpdate(id, updateFields, { new: true });

    res.send({ message: 'Producto actualizado correctamente', updatedProduct });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Error al actualizar el producto' });
  }
});


//*************  Eliminar producto  **************************** */
router.delete("/product/:id", (req,res)=>{
    const {id} = req.params;
    productSchema
        .findByIdAndRemove({_id: id})
        .then((data) => res.json(data))
        .catch((error)=> res.json({message: error}))
})

//*************  Obtener productos al azar  **************************** */
router.get("/productA", (req,res)=>{
    productSchema
        .aggregate([{ $sample: { size: 3 } }])
        .then((data) => res.json(data))
        .catch((error)=> res.json({message: error}))
})


module.exports = router;
