const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Problems collection and inserts the problems below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/practiceengine"
);

const factorialQuestion = "Write an anonymous function that accepts an integer parameter n and uses recursion to \
  compute and return n factorial, (n!). The function should throw an error if n is negative or if n is not a number. You may declare a helper method \
  within your anonymous function if you like, and recurse using that. Alternatively, you may recurse on your anonymous function by calling user(n)."

const factorialSolution = "solution = function(value) { \
  if(isNaN(value)) { \
      throw 'Argument must be a number.'; \
  } \
  if(value < 0) { \
      throw 'Argument cannot be negative.'; \
  } else if (value > 0) { \
      return value * solution(value - 1); \
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

const arrayStretchQuestion = "Write an anonymous function that accepts an array as a parameter and returns a new array twice as \
  large as the original, replacing every value from the original array with a pair of values, each half the original value. \
  For example, if a variable named list refers to an array storing the values \
  {18, 7, 4, 24, 11}, the call of stretch(list) should return a new array containing {9, 9, 3.5, 3.5, 2, 2, 12, 12, 5.5, 5.5}. \
  If any item in the parameter array is not a number, have your code throw an error."

const arrayStretchSolution = "solution = function(values) { \
  let result = []; \
  if(values.length > 0) { \
      for(let i = 0; i < values.length; i++) { \
        if(isNaN(values[i])) { \
          throw 'All values in parameter array must be numbers.'; \
        } else { \
          result[i*2] = values[i]/2; \
          result[i*2 + 1] = values[i]/2; \
        } \
      } \
  } \
  return result; \
}"

const arrayStretchTrials = [
  [[]],
  [[42]],
  [[18, 7, 4, 24, 11]],
  [[87, 14, 67, 3, 0, 1, 19, 29]],
  [[13, "Not a number", [], {}]]
];

const rotateRightQuestion = "Write an anonymous function that accepts an array as a parameter and returns an array with \
  the values in the original rotated to the right (i.e., forward in position) by one. Each element moves right by one, except the last \
  element, which moves to the front. For example, if a variable named list refers to an array containing the values \
  {3, 8, 19, 7}, the call of rotateRight(list) should return an array that stores {7, 3, 8, 19}. Your function should make \
  no assumptions about the type of elements stored in the original array, but each element from the original must appear \
  in the new array.";

const rotateRightSolution = "solution = function(values) { \
  let result = []; \
  if(values.length > 1) { \
      for(let i = values.length - 1; i > 0; i--) { \
          result[i] = values[i - 1]; \
      } \
  } if(values.length > 0) {  \
    result[0] = values[values.length-1]; \
  } \
  return result; \
}";

const rotateRightTrials = [
  [[]],
  [[42]],
  [[100, 200]],
  [[3, 8, 19, 7]],
  [[10, 20, 30, 40, 50, 60, 70]],
  [["sentence", "should", "make", "sense.", "This"]]
];

const isPalindromeQuestion = "Write an anonymous function that accepts a String as a parameter and returns true \
if the String is a palindrome and false otherwise. A String is considered a palindrome if it has the same sequence of letters \
when reversed (e.g., 'radar', 'toot', 'mom', 'a', and ''). Your method should be case-insensitive; for example, 'Mom' and 'RAdar' \
should be considered palindromes. If the String has spaces, they should be ignored when testing palindromy. If the parameter passed \
is not a String, your code should throw an error. \n HINT: Use the typeof operator to make sure the parameter is a String. \n HINT: Use .replace(/\\s/g,'') to eliminate whitespace in the text.";

const isPalindromeSolution = "solution = function(value) { \
  if(typeof(value) !== 'string') { \
    throw 'Parameter must be a String.'; \
  } \
  value = value.replace(/\\s/g,''); \
  value = value.toLowerCase(); \
  for(let i = 0; i < value.length; i++) { \
      if(value.charAt(i) !== value.charAt(value.length - (1 + i))) { \
          return false; \
      } \
  } \
  return true; \
}";

const isPalindromeTrials = [
  [""],
  ["a"],
  ["ok"],
  ["Mom"],
  ["RaCecar"],
  ["Nathan"],
  ["Madam Im Adam"],
  ["No way a papaya won"],
  ["No way a papaya lost"],
  [42]
];

const isUniqueQuestion = "Write an anonymous function that takes an array as a parameter and returns a boolean value \
  indicating whether or not the values in the array are unique (true for yes, false for no). The values in the list are considered unique \
  if there is no pair of values that are equal. For example, if a variable called list stores the following values: {3, 8, 12, 2, 9, 15, 29}, the \
  function will return true as there is no value that appears more than one in the list. You may assume that the incoming array will only store \
  String, boolean, float, or integer elements.";

const isUniqueSolution = "solution = function(values) { \
  for(let i = 0; i < values.length; i++) { \
      for(let j = 0; j < values.length; j++) { \
          if(values[i] === values[j] && i !== j) { \
              return false; \
          } \
      } \
  } \
  return true; \
}";

const isUniqueTrials = [
  [[]],
  [[42]],
  [[1, 3, 3]],
  [["These", "are", "all", "unique"]],
  [["These", "really", "really", "aren't"]],
  [[3, 5.5, "String", false]],
  [[9, 4.4, 4.3, "String", "String", true]]
];

const problemSeed = [
  {
    title: "Factorial",
    author: "sapreut",
    question: factorialQuestion,
    solution: factorialSolution,
    trials: factorialTrials,
    difficulty: 2,
    category: "Recursion",
    verified: true
  },
  {
    title: "Stretch",
    author: "sapreut",
    question: arrayStretchQuestion,
    solution: arrayStretchSolution,
    trials: arrayStretchTrials,
    difficulty: 2,
    category: "Array Manipulation",
    verified: true
  },
  {
    title: "Rotate Right",
    author: "sapreut",
    question: rotateRightQuestion,
    solution: rotateRightSolution,
    trials: rotateRightTrials,
    difficulty: 3,
    category: "Array Manipulation",
    verified: true
  },
  {
    title: "Is Palindrome",
    author: "sapreut",
    question: isPalindromeQuestion,
    solution: isPalindromeSolution,
    trials: isPalindromeTrials,
    difficulty: 2,
    category: "String Parsing",
    verified: true
  },
  {
    title: "Is Unique",
    author: "sapreut",
    question: isUniqueQuestion,
    solution: isUniqueSolution,
    trials: isUniqueTrials,
    difficulty: 2,
    category: "Array Manipulation",
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
