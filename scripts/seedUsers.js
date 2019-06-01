const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Users collection and inserts the users below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/practiceengine"
);

const userSeed = [
  {
    username: "axion",
    password: "111",
    completed: ["5cf20e31ea247115f406538a"]
  },
  {
    username: "sapreut",
    password: "testingPassword"
  },
  {
    username: "bestuserever",
    password: "111"
  },
  {
    username: "badcoder",
    password: "111"
  }
];

db.User
  .remove({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
