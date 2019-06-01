const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, required: true},
  password: {type: String, required: true},
  completed: {type: Array, required: true},
  created: {type: Array, required: true},
  dateJoined: {type: Date, default: Date.now}
});

const User = mongoose.model("User", userSchema);

module.exports = User;
