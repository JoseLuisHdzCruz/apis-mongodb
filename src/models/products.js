const mongoose = require("mongoose");

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

module.exports = mongoose.model('Product', productSchema);