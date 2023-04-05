const userControllers = require("../controllers/userControllers");
const verifyTokenController = require("../controllers/verifyTokenController");
const router = require("express").Router();
//getAlluser
router.get("/", verifyTokenController, userControllers.getAllUsers);

module.exports = router;
