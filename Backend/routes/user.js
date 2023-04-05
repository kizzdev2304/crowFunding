const userControllers = require("../controllers/userControllers");
const verifyTokenController = require("../controllers/verifyTokenController");
const router = require("express").Router();
//getAlluser
router.get("/user", verifyTokenController, userControllers.getAllUsers);
router.delete("/user/:id", verifyTokenController, userControllers.deleteUsers);

module.exports = router;
