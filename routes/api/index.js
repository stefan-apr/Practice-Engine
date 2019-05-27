const router = require("express").Router();
const problemRoutes = require("./problems");
const userRoutes = require("./users");

// Problem routes
router.use("/problems", problemRoutes);
// User routes
router.use("/users", userRoutes);

module.exports = router;
