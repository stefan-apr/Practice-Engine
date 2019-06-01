const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  completed: {type: Array, default: []},
  score: {type: Number, default: 0},
  created: {type: Array, default: []},
  dateJoined: {type: Date, default: Date.now}
});

const User = mongoose.model("User", userSchema);

module.exports = User;
