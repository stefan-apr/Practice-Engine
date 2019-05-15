const router = require("express").Router();
const problemRoutes = require("./problems");

// Problem routes
router.use("/problems", problemRoutes);

module.exports = router;
