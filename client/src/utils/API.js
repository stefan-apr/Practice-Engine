import axios from "axios";

export default {
  // Gets all problems
  getProblems: function() {
    return axios.get("/api/problems/");
  },
  // Gets the problem with the given id
  getProblem: function(id) {
    return axios.get("/api/problems/" + id);
  },
  // Deletes the problem with the given id
  deleteProblem: function(id) {
    return axios.get("/api/problems");
  },
  // Saves a problem to the database
  saveProblem: function(problemData) {
    return axios.post("/api/problems", problemData);
  },

  // Gets all users
  getUsers: function() {
    return axios.get("/api/users");
  },
  // Gets the user with the given id
  getUser: function(id) {
    return axios.get("/api/users/" + id);
  },
  // Deletes the user with the given id
  deleteUser: function(id) {
    return axios.get("/api/users");
  },
  // Saves a user to the database
  saveUser: function(userData) {
    return axios.post("/api/users", userData);
  },
};
