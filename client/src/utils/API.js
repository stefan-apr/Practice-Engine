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
    console.log("API fired")
    return axios.get("/api/users");
  },
  // Gets the user with the given id
  getUser: function(username) {
    return axios.get("/api/users/" + username);
  },
  // Deletes the user with the given id
  deleteUser: function(id) {
    return axios.get("/api/users");
  },
  // Saves a user to the database
  saveUser: function(userData) {
    return axios.post("/api/users", userData);
  },
  // Validate login info
  validateInfo: function(username) {
    const query = "/api/users/validate/" + username;
    return axios.get(query);
  },
  // Gets the top 5 users
  getTopUsers: function() {
    return axios.get("/api/users");
  },
  updateUser: function(username, updatedArr) {
    return axios.put(("/api/users/" + username), updatedArr)
  }
};
