const db = require("../models");

module.exports = {
    
    findAll: function(req, res) {
        db.User
          .find(req.query)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
    },
    findById: function(req, res) {
        db.User
          .findById(req.params.id)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
      },
    create: function(req, res) {
        const populatedInfo = {
          username: req.body.username,
          password: req.body.password,
          completed: [],
          created: [],
        };

        db.User
          .create(populatedInfo)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
    },
    update: function(req, res) {
        db.User
          .findOneAndUpdate({ _id: req.params.id }, req.body)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
    },
    remove: function(req, res) {
        db.User
          .findById({ _id: req.params.id })
          .then(dbModel => dbModel.remove())
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
    },
    validate: function(req, res){
      db.User
        .findOne({ username: req.params.username }, function (err, userInfo) {
          res.send(userInfo);
        })
    }
}