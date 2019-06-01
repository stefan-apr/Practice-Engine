const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Users collection and inserts the users below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/practiceengine"
);

const userSeed = [
  {
    username: "sapreut",
    password: "testingPassword",
    completed: [],
    created: [],
  },
  {
    username: "InterGalacticKillar",
    password: "111",
    completed: [],
    created: [],
  },
  {
    username: "ethan",
    password: "111",
    completed: [],
    created: [],
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
