const multer = require('multer');
const host = process.env.APP_HOST;
// Configuración de Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './storage/imgs')
    },
    filename: function (req, file, cb) {
      cb(null, `${file.fieldname}-${Date.now()}.jpg`)
    }
  });
  
  const upload = multer({storage:storage});

  module.exports = upload;