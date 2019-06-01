const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const problemSchema = new Schema({
  title: {type: String, required: true},
  author: {type: String, required: true},
  question: {type: String, required: true},
  solution: {type: String, required: true},
  trials: {type: Array, required: true},
  difficulty: {type: Number, required: true},
  category: {type: String, required: true},
  examineType: {type: String, required: true},
  paramTypes: {type: Array, required: true},
  flags: {type: Array},
  verified: {type: Boolean, default: false}
});

const Problem = mongoose.model("Problem", problemSchema);

module.exports = Problem;
