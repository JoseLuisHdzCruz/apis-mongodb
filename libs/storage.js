const multer = require('multer');
// const host = process.env.APP_HOST;
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './storage/imgs')
    },
    filename: function (req, file, cb) {
      cb(null, `${file.fieldname}-${file.originalname}`)
    }
  });

  const fileFilter = function (req, file, cb) {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Tipo de archivo no válido. Solo se aceptan imágenes con extensiones .jpg, .jpeg, .png, o .gif.'), false);
    }
  }
  
  const upload = multer({ storage: storage, fileFilter: fileFilter });

  module.exports = upload;