const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try { // essai des instruction suivante
    const token = req.headers.authorization.split(' ')[1]; // recupération du token ([0]Bearer / [1]token en fonction du USerID)
    const decodedToken = jwt.verify(token, '$2b$10$hLNQnC3nMg7RQgnrDcdj9Oltl.UBmGruFCuNz2G.y33AjMgLJEJbq'); // Clé de crytage du tokken pour décodage
    const userId = decodedToken.userId; //mise en memeoire du token decryté
    if (req.body.userId && req.body.userId !== userId) { // vérification du tokken 
      throw 'Invalid user ID';  // mauvais token
    } else {
      next(); // bon token on passe a la suite
    }
  } catch { // si erreur dans les inscrutions du try
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};