const router = require("express").Router();
const problemsController = require("../../controllers/problemsController");

// Matches with "/api/books"
router.route("/")
  .get(problemsController.findAll)
  .post(problemsController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(problemsController.findById)
  .put(problemsController.update)
  .delete(problemsController.remove);

module.exports = router;
