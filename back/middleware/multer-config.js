const multer = require('multer');

// creation d'un objet pour ajouter une extention en fonction du type mime du ficher
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// function pour création du nom de l'image pour le stocage sur le serveur
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'sauce_image');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_'); // suppression des espace par des underScore
    const extension = MIME_TYPES[file.mimetype];  // recuperation de l'extention en function du type mime
    callback(null, name + Date.now() + '.' + extension);  // création du nom avec le nom de l'image + ajout de la date la seconde + . + extension
  }
});

// exportion en un fichier unique avec multer
module.exports = multer({storage: storage}).single('image');