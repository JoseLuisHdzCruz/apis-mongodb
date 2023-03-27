const mongoose = require("mongoose");
require("dotenv").config();

const productSchema = mongoose.Schema({
    Producto: {
        type: String,
        require: true
    },
    Descripcion: {
        type: String,
        require: true
    },
    Precio: {
        type: Number,
        require: true
    },
    Stock: {
        type: Number,
        require: true
    },
    Imagen: {
        type: String,
        require: true
    }
})


productSchema.methods.setImagen = function setImagen(filename){
    const host = process.env.APP_HOST;
    this.Imagen = `${host}/public/${filename}`
}



module.exports = mongoose.model('Product', productSchema);