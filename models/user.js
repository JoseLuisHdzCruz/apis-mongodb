const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    Nombre: {
        type: String,
        require: true
    },
    ApPaterno: {
        type: String,
        require: true
    },
    ApMaterno: {
        type: String,
        require: true
    },
    Telefono: {
        type: String,
        require: true
    },
    Correo: {
        type: String,
        require: true
    },
    Usuario: {
        type: String,
        require: true
    },
    Password: {
        type: String,
        require: true
    },
    Pregunta: {
        type: String,
        require: true
    },
    Respuesta: {
        type: String,
        require: true
    }
})

userSchema.methods.compararPassword = function(Password, cb){
    bcrypt.compare(Password, this.Password, (err, sonIguales)=>{
        if(err){
            return cb(err);
        }
        cb(null, sonIguales);
    })
}

module.exports = mongoose.model('User', userSchema);