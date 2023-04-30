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


productSchema.methods.setImagen = function setImagen(public_id, secure_url){
    this.Imagen = secure_url;
}




module.exports = mongoose.model('Product', productSchema);