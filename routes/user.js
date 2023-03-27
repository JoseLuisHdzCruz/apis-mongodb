const express= require("express");
const bcrypt = require('bcrypt');
const userSchema = require("../models/user");

const router = express.Router();

//create user
//******************* Fumcional ******************************* */
// router.post("/users", (req,res)=>{
//     const user = userSchema(req.body);
//     user
//         .save()
//         .then((data) => res.json(data))
//         .catch((error)=> res.json({message: error}))
// })

//get all user
router.get("/users", (req,res)=>{
    userSchema
        .find()
        .then((data) => res.json(data))
        .catch((error)=> res.json({message: error}))
})

//get a user
router.get("/users/:id", (req,res)=>{
    const {id} = req.params;
    userSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((error)=> res.json({message: error}))
})

//get a user
router.get("/obtPregunta", (req,res)=>{
    const {Correo} = req.body;
    userSchema
        .find({Correo: Correo},{Pregunta: 1, Usuario: 1, _id: 0})
        .then((data) => res.json(data))
        .catch((error)=> res.json({message: error}))
})

router.get("/compRespuesta", (req,res)=>{
    const {Respuesta, Usuario} = req.body;
    userSchema
        .find({Respuesta: Respuesta, Usuario: Usuario},{Respuesta: 1,  _id: 1})
        .then((data) => res.json(data))
        .catch((error)=> res.json({message: error}))
})



//update a user


//delete a user
router.delete("/users/:id", (req,res)=>{
    const {id} = req.params;
    userSchema
        .findByIdAndRemove({_id: id})
        .then((data) => res.json(data))
        .catch((error)=> res.json({message: error}))
})



//******************** Encryptacion ******************************** */

const hashPassword = async (Password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(Password, salt);
    return hashedPassword;
}

const compare = async (passwordPlain, hashPassword) => {
    return await bcrypt.compare(passwordPlain, hashPassword);
}

//*********************  Desifrar contraseña  ************************ */
const loginctrl = async (req, res) => {
    try{
        const {Usuario, Password} = req.body;
        const user = await userSchema.findOne({Usuario});

        if(!user){
            res.status(404);
            res.send({
                error: "User not foud"
            })
            return
        }
        const checkPassword = await compare(Password, userSchema.Password);
        if(checkPassword){
            res.send({
                data: user
            })
            return
        }
        if(!checkPassword){
            res.status(404);
            res.send({
                error: "Invalid password"
            })
            return
        }
    }catch(error){
        console.error(`Error en las credenciales ${error.message}`);
    }

}

router.post("/login", loginctrl)

//*********************  Insertar usuarios  *********************** */

async function addUser (req,res){
    // const hashedPassword = await hashPassword(req.body.Password);
    const user = new userSchema({
        Nombre:     req.body.Nombre,
        ApPaterno:  req.body.ApPaterno,
        ApMaterno:  req.body.ApMaterno,
        Telefono:   req.body.Telefono,
        Correo:     req.body.Correo,
        Usuario:    req.body.Usuario,
        Password:   req.body.Password,
        Pregunta:   req.body.Pregunta,
        Respuesta:  req.body.Respuesta


    });
    await user
        .save()
        .then((data) => res.json(data))
        .catch((error)=> res.json({message: error}))
}

router.post("/users", addUser)

 //*********************  Actualizar Usuario ************************** */

async function updUser (req,res){
  
  const {id} = req.params;
  const {Telefono, Correo, Usuario, Password} = req.body;
  // const {Password} = hashedPassword;
//   const Password = await hashPassword(req.body.Password);
  
  await userSchema
      .updateOne({_id: id},{$set :{ Telefono, Correo, Usuario, Password}})
      .then((data) => res.json(data))
      .catch((error)=> res.json({message: error}))
}

router.put("/users/:id", updUser)

//***************  Actualizar contraseña  ****************** */

async function updPass (req,res){
  
    const {id} = req.params;
    const {Password} = req.body;
    // const Password = await hashPassword(req.body.Password);
    
    await userSchema
        .updateOne({_id: id},{$set :{Password}})
        .then((data) => res.json(data))
        .catch((error)=> res.json({message: error}))
  }
  
  router.put("/updPass/:id", updPass)

module.exports = router;