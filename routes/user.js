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

async function addUser (req,res){
    const hashedPassword = await hashPassword(req.body.Password);
    const user = new userSchema({
        Nombre:     req.body.Nombre,
        ApPaterno:  req.body.ApPaterno,
        ApMaterno:  req.body.ApMaterno,
        Telefono:   req.body.Telefono,
        Correo:     req.body.Correo,
        Usuario:    req.body.Usuario,
        Password:   hashedPassword,
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

// async function updUser (req,res){
//   const hashedPassword = await hashPassword(req.body.Password);
//   const {id} = req.params;
//   // const {Telefono, Correo, Usuario} = req.body;
//   // const {Password} = hashedPassword;

//   const user = new userSchema({
//     Telefono:   req.body.Telefono,
//     Correo:     req.body.Correo,
//     Usuario:    req.body.Usuario,
//     Password:   hashedPassword
// });
        
//   await user
//       .updateOne({_id: id},{$set :{ Telefono, Correo, Usuario, Password}})
//       .then((data) => res.json(data))
//       .catch((error)=> res.json({message: error}))
// }

// router.put("/users/:id", updUser)

// //*****************  Login  ********************* */

// async function authenticateUser(req,res) {
//     // Buscar al usuario en la base de datos
//     const {Usuario} = req.body;
//     const {Password} = req.body;
//     try{
//         const user = 
//           await userSchema.findOne({ Usuario })
//           .then((data) => res.json(data))
//           .catch((error)=> res.json({message: error}))
//         ;
  
//         const isMatch = await bcrypt.compare(Password, user.Password);
//         if (isMatch) {
//           return user;
//         }
//     } catch (error) {
//         console.error(error);
//     }
//   }


//   router.get("/login", authenticateUser)

module.exports = router;