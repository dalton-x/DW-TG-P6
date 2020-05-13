const Sauces = require('../models/sauces');
const fs = require('fs');

// Creation d 'une sauce
exports.createSauces = (req, res, next) => {
  const saucesObject = JSON.parse(req.body.sauce);
  delete saucesObject._id;
  const sauces = new Sauces({
    ...saucesObject,
    imageUrl: `${req.protocol}://${req.get('host')}/sauce_image/${req.file.filename}`
  });
  sauces.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};

// Recuperation d' une sauce avec son Id
exports.getOneSauces = (req, res, next) => {
  Sauces.findOne({
    _id: req.params.id
  }).then(
    (sauces) => {
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(404).json({
        error: error
      });
    }
  );
};

// Modifiction d'une sauce
exports.modifySauces = (req, res, next) => {
  const saucesObject = req.file ?
    {
      ...JSON.parse(req.body.sauces),
      imageUrl: `${req.protocol}://${req.get('host')}/sauce_image/${req.file.filename}`
    } : { ...req.body };
  Sauces.updateOne({ _id: req.params.id }, { ...saucesObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
};

// Supression d'une sauce via son ID
exports.deleteSauces = (req, res, next) => {
  Sauces.findOne({ _id: req.params.id })
  .then(sauces => {
    const filename = sauces.imageUrl.split('/sauce_image/')[1];
    fs.unlink(`sauce_image/${filename}`, () => {
      Sauces.deleteOne({ _id: req.params.id })
        .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
        .catch(error => res.status(400).json({ error }));
    });
  })
  .catch(error => res.status(500).json({ error }));
};

//recuperation de toutes les sauces
exports.getAllSauces = (req, res, next) => {
  Sauces.find().then(
    (sauces) => {
      res.status(200).json(sauces);
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
};


// like or dislike ??

exports.usersLike =(req, res, next) => {
  const userId = req.body.userId;
  const like = req.body.like;
  const sauceId = req.params.id;
  if (like == 1){  // like de la sauce
    Sauces.updateMany( // update est obselete preference de updateMany
    { _id: sauceId }, 
      {
        $inc: { likes: 1 }, // ajout de 1 au nombre de likes
        $push: { usersLiked: userId } // ajout du userId au tableau des usersLiked
      }
    )
    .then(
      () => {
        res.status(200).json({});
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  }else if (like == -1){ // dislike de la sauce
    Sauces.updateMany(  // update est obselete preference de updateMany
      { _id: sauceId }, 
        {
          $inc: { dislikes: 1 }, // ajout de 1 au nombre de dislikes
          $push: { usersDisliked: userId } // ajout du userId au tableau des usersDisliked
        }
      )
      .then(
        () => {
          res.status(200).json();
        }
      ).catch(
        (error) => {
          res.status(404).json({
            error: error
          });
        }
      );
  };
};