const mongoose = require("mongoose");

const prototypeSchema = mongoose.Schema({
    tarjeta: {
        type: String,
        require: true
    },
    estPuerta: {
        type: Number,
        require: true
    },
    estPorton: {
        type: Number,
        require: true
    }
})

module.exports = mongoose.model('Prototype', prototypeSchema);