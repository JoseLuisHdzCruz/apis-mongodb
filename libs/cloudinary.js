const cloudinary = require('cloudinary').v2;
const name = process.env.CLOUD_NAME;
const key = process.env.CLOUD_KEY;
const api = process.env.CLOUS_API;

// Configuration 
cloudinary.config({
  cloud_name: name,
  api_key: key,
  api_secret: api,
  secure: true
});

module.exports = cloudinary;
// export async function uploadImage(filePath){
//     return await cloudinary.uploader.upload(filePath, {
//         folder: `ProyectoTI`
//     })
// }
