const ListNode = require("../client/src/components/LinkedList/SeedList");
const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Problems collection and inserts the problems below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/practiceengine"
);

const factorialQuestion = "Write an anonymous function that accepts an integer parameter n and uses recursion to \
  compute and return n factorial, (n!). The function should throw an error if n is negative or if n is not a number. You may declare a helper method \
  within your anonymous function if you like, and recurse using that. Alternatively, you may recurse on your anonymous function by calling user(n). \
  Do not use any loops in solving this problem; solve it recursively."

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
  If any item in the parameter array is not a number, have your code throw an error.";

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
  [[13, "Not a number", []]]
];

const arrayStretch2Question = "Write an anonymous function that accepts an array as a parameter and modifies the array into a new array twice as \
  large as the original, replacing every value from the original array with a pair of values, each half the original value. \
  For example, if a variable named list refers to an array storing the values \
  {18, 7, 4, 24, 11}, your function(list) should modify the parameter into a new array containing {9, 9, 3.5, 3.5, 2, 2, 12, 12, 5.5, 5.5}. \
  If any item in the parameter array is not a number, have your code throw an error.";

const arrayStretch2Solution = "solution = function(values) { \
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
      values.length = 0; \
      for(let i = 0; i < result.length; i++) { \
        values[i] = result[i]; \
      } \
  } \
}"

const arrayStretch2Trials = [
  [[]],
  [[42]],
  [[18, 7, 4, 24, 11]],
  [[87, 14, 67, 3, 0, 1, 19, 29]],
  [[13, "Not a number", []]]
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

const rotateRight2Question = "Write an anonymous function that accepts an array as a parameter and modifies the array such that \
  the values in the original rotate to the right (i.e., forward in position) by one. Each element moves right by one, except the last \
  element, which moves to the front. For example, if a variable named list refers to an array containing the values \
  {3, 8, 19, 7}, the call of function(list) should modify the parameter array to store {7, 3, 8, 19}. Your function should make \
  no assumptions about the type of elements stored in the original array, but no elements may be lost in the modification.";

const rotateRight2Solution = "solution = function(values) { \
  let result = []; \
  if(values.length > 1) { \
      for(let i = values.length - 1; i > 0; i--) { \
          result[i] = values[i - 1]; \
      } \
  } if(values.length > 0) {  \
    result[0] = values[values.length-1]; \
  } \
  for(let i = 0; i < result.length; i++) { \
    values[i] = result[i]; \
  } \
}";

const rotateRight2Trials = [
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
is not a String, your code should throw an error. \n HINT: Use .replace(/\\s/g,'') to eliminate whitespace in the text.";

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

const multiplyEvensQuestion = " Write an anonymous function that returns the product of the first n even integers. For example, \
  if your function takes in a parameter of 4, your function would return (2 * 4 * 6 * 8) = 384. If the parameter passed is not an \
  integer, your function should throw an error. It should also throw an error if the parameter is 0 or negative. You may declare \
  a helper method whithin your anonymous function if you like, and recurse on that. Alternatively, you may recurse directly on your \
  anonymous function by calling user(n). Do not use any loops in solving this problem; solve it recursively.";

const multiplyEvensSolution = "solution = function(value) { \
  if(isNaN(value)) { \
    throw 'Argument must be a number'; \
  } \
  if(value <= 0) { \
    throw 'Argument must be greater than 0'; \
  } \
  if(value > 1) { \
    return value * 2 * solution(value - 1); \
  } \
  else { \
    return 2;  \
  } \
}";

const multiplyEvensTrials = [
  [1],
  [3],
  [4],
  [13],
  [0],
  ["Not a Number"]
];

const hasMidpointQuestion = "Write an anonymous function that accepts three numbers as parameters and returns true if one of the \
  numbers is the midpoint between the other two numbers; that is, if one number is exactly halfway between the others. Your method should \
  return false if no such midpoint relationship exists. The numbers could be passed in any order; the midpoint could be the 1st, 2nd, \
  or 3rd. You must check all cases. You may assume that your method will always be passed three numbers.";

const hasMidpointSolution = "solution = function(x, y, z) {\
  if(Math.abs(z - x) === Math.abs(z - y)) {\
      return true;\
  }\
  if(Math.abs(y - x) === Math.abs(y - z)) {\
      return true;\
  }\
  if(Math.abs(x - y) === Math.abs(x - z)) {\
      return true;\
  }\
  return false;\
}";

const hasMidpointTrials = [
  [1, 2, 3],
  [0, -50, -25],
  [21, 9, 58],
  [-2, 9, 27],
  [2, 10, 6]
];

const sumAlongQuestion = "Write an anonymous function that accepts a Linked ListNode and an integer n as parameters and returns the sum of the data \
in the nodes along the Linked List. Your function should traverse the linked list until its end or until you have traversed over n list nodes, whichever \
comes first. If the parameter n is not an integer or if it is less than 1, your function should throw an error. You may assume that any given ListNode's \
data in the parameter Linked List will always be an integer value. You may assume that the parameter ListNode will not be null.";

const sumAlongSolution = "solution = function(list, n) { \
  if(isNaN(n)) { \
    throw 'Argument must be a number.' \
  } else if(n < 1) { \
    throw 'Argument must be 1 or greater.' \
  } \
  let result = 0; \
  if(list.next === null) { \
    return list.data; \
  } else { \
    let count = 0; \
    while(list.hasNext() && count < n) { \
      result += list.data; \
      list = list.next; \
      count++; \
    } \
    if(count < n) {  \
      result += list.data; \
    } \
    return result; \
  } \
}";

const sumAlongTrials = [
  [new ListNode(3, new ListNode(4, new ListNode(1, new ListNode(0, new ListNode(13, new ListNode(5, new ListNode(7, new ListNode(9)))))))), 8],
  [new ListNode(6, new ListNode(6, new ListNode(6, new ListNode(6, new ListNode(6))))), 4],
  [new ListNode(42, new ListNode(42)), 1],
  [new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5, new ListNode(6, new ListNode(7, new ListNode(8, new ListNode(9, new ListNode(10, new ListNode(11, new ListNode(12, new ListNode(13))))))))))))), 42],
  [new ListNode(1, new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5, new ListNode(6, new ListNode(7, new ListNode(8, new ListNode(9, new ListNode(10, new ListNode(11, new ListNode(12, new ListNode(13))))))))))))), 10],
  [new ListNode(3), 15],
  [new ListNode(4, new ListNode(8)), 0],
  [new ListNode(4, new ListNode(8)), "This is a String"]
];

const problemSeed = [
  {
    title: "Factorial",
    author: "sapreut",
    question: factorialQuestion,
    solution: factorialSolution,
    trials: factorialTrials,
    difficulty: 1,
    category: "Recursion",
    examineType: "return",
    paramTypes: ["Number"],
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
    examineType: "return",
    paramTypes: ["Array"],
    verified: true
  },
  {
    title: "Stretch 2",
    author: "sapreut",
    question: arrayStretch2Question,
    solution: arrayStretch2Solution,
    trials: arrayStretch2Trials,
    difficulty: 3,
    category: "Array Manipulation",
    examineType: "paramArray",
    paramTypes: ["Array"],
    verified: true
  },
  {
    title: "Rotate Right",
    author: "sapreut",
    question: rotateRightQuestion,
    solution: rotateRightSolution,
    trials: rotateRightTrials,
    difficulty: 2,
    category: "Array Manipulation",
    examineType: "return",
    paramTypes: ["Array"],
    verified: true
  },
  {
    title: "Rotate Right 2",
    author: "sapreut",
    question: rotateRight2Question,
    solution: rotateRight2Solution,
    trials: rotateRight2Trials,
    difficulty: 3,
    category: "Array Manipulation",
    examineType: "paramArray",
    paramTypes: ["Array"],
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
    examineType: "return",
    paramTypes: ["String"],
    verified: true
  },
  {
    title: "Is Unique",
    author: "sapreut",
    question: isUniqueQuestion,
    solution: isUniqueSolution,
    trials: isUniqueTrials,
    difficulty: 1,
    category: "Array Manipulation",
    examineType: "return",
    paramTypes: ["Array"],
    verified: true
  },
  {
    title: "Multiply Evens",
    author: "sapreut",
    question: multiplyEvensQuestion,
    solution: multiplyEvensSolution,
    trials: multiplyEvensTrials,
    difficulty: 2,
    category: "Recursion",
    examineType: "return",
    paramTypes: ["Number"],
    verified: true
  },
  {
    title: "Has Midpoint",
    author: "sapreut",
    question: hasMidpointQuestion,
    solution: hasMidpointSolution,
    trials: hasMidpointTrials,
    difficulty: 1,
    category: "Conditionals and Returns",
    examineType: "return",
    paramTypes: ["Number", "Number", "Number"],
    verified: true
  },
  {
    title: "Sum Along",
    author: "sapreut",
    question: sumAlongQuestion,
    solution: sumAlongSolution,
    trials: sumAlongTrials,
    difficulty: 2,
    category: "Linked Lists",
    examineType: "return",
    paramTypes: ["LinkedList", "Number"],
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
