const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configurar Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_API,
    secure: true
  });

// Configurar Multer para almacenamiento en Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'Project', // Nombre de la carpeta en Cloudinary donde se guardarán las imágenes
  allowedFormats: ['jpg', 'jpeg', 'png', 'gif'],
  transformation: [{ width: 500, height: 500, crop: 'limit' }]
});

const parser = multer({ storage: storage });

// Export the Multer upload and Cloudinary upload middlewares
module.exports = parser;
