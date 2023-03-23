const mongoose = require("mongoose");

const prototypeSchema = mongoose.Schema({
    estPuerta: {
        type: String,
        require: true
    },
    servo: {
        type: Number,
        require: true
    },
    estPorton: {
        type: Number,
        require: true
    },
    Porton: {
        type: String,
        require: true
    },
    usuario: {
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Prototype', prototypeSchema);