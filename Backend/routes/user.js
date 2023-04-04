const middlewareControllers = require("../controllers/middlewareControllers");
const userControllers = require("../controllers/userControllers");
const router = require("express").Router();
//getAlluser
router.get("/", middlewareControllers.verifyToken, userControllers.getAllUsers);
//deleteUser
router.delete("/:id", userControllers.deleteUsers);

module.exports = router;
