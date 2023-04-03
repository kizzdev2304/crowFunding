const userControllers = require("../controllers/userControllers");
const router = require("express").Router();
//getAlluser
router.get("/", userControllers.getAllUsers);
//deleteUser
router.delete("/:id", userControllers.deleteUsers);

module.exports = router;
