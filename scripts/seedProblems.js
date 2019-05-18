const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Problems collection and inserts the problems below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/practiceengine"
);

const factorialQuestion = "Write an anonymous function that accepts an integer parameter n and uses recursion to \
  compute and return n factorial, (n!). The function should throw an error if n is negative or if n is not a number. Some potential values of n \
  and the expected return are shown below:"

const factorialSolution = "solutionFactorial = function(value) { \
  if(isNaN(value)) { \
      throw 'Argument must be a number'; \
  } \
  if(value < 0) { \
      throw 'Argument cannot be negative'; \
  } else if (value > 0) { \
      return value * solutionFactorial(value - 1); \
  } else { \
      return 1; \
  } \
}";

const factorialTrials = [
  [0],
  [1],
  [3],
  [5],
  [10],
  [-4],
  ["Not a number"]
];

const problemSeed = [
  {
    title: "Factorial",
    author: "sapreut",
    question: factorialQuestion,
    solution: factorialSolution,
    trials: factorialTrials,
    difficulty: 2,
    category: "Basic Recursion",
    verified: true
  }
];

db.Problem
  .remove({})
  .then(() => db.Problem.collection.insertMany(problemSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
