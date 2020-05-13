const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const saucesCtrl = require('../controllers/sauces');

router.get('/', auth, saucesCtrl.getAllSauces);              // Renvoie le tableau de toutes les sauces dans la base de données
router.get('/:id', auth, saucesCtrl.getOneSauces);           // Renvoie la sauce avec l'ID fourni
router.post('/', auth, multer, saucesCtrl.createSauces);     // Capture et enregistre l'image, analyse la sauce en utilisant une chaîne de caractères et l'enregistre dans la base de données, en définissant correctement son image URL. Remet les sauces aimées et celles détestées à 0, et les sauces usersliked et celles usersdisliked aux tableaux vides.
router.put('/:id', auth, multer, saucesCtrl.modifySauces);   // Met à jour la sauce avec l'identifiant fourni. Si une image est téléchargée, capturez-la et mettez à jour l'imageURL des sauces. Si aucun fichier n'est fourni, les détails de lasauce figurent directement dans le corps de la demande(req.body.name,req.body.heat etc). Si un fichier est fourni, la sauce avec chaîne est en req.body.sauce.
router.delete('/:id', auth, saucesCtrl.deleteSauces);        // Supprime la sauce avec l'ID fourni.

module.exports = router;