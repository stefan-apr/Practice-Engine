const db = require("../models");

module.exports = {
    
    findAll: function(req, res) {
        db.User
          .find(req.query)
          .then(dbModel => res.json(dbModel))
          .catch(err => res.status(422).json(err));
    },
    findByName: function(req, res) {
        db.User
          .findOne({ username: req.params.username})
          .then(dbModel => res.send(dbModel))
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
          .findOneAndUpdate({ username: req.params.username }, req.body)
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
    },
    getTops: function(req, res) {
      db.User
        .find()
        .sort({'score': -1})
        .limit(5)
        .exec(function(err, topUsers){
          res.send(topUsers);
        })
    }
}