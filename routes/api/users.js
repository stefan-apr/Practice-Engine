const router = require("express").Router();
const userController = require("../../controllers/usersController");

// Matches with "/api/users"
router.route("/")
  .get(userController.getTops)
  .post(userController.create);

// Matches with "/api/users/:username"
router
  .route("/:username")
  .get(userController.findByName)
  .put(userController.update)
  .delete(userController.remove);

//for login only, matches with "/api/users/validate"
router
  .route("/validate/:username")
  .get(userController.validate);


module.exports = router;
