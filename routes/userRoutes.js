const express = require("express");
const router = express.Router();
const controller = require("../controllers/userController");
const auth = require("../middleware/authMiddleware");

router.post("/signup", controller.signup);
router.post("/signin", controller.signin);

router.post("/", controller.signup);
router.get("/", controller.getUsers);
router.get("/:id", controller.getUserById);
router.put("/:id", auth, controller.updateUser);
router.delete("/:id", auth, controller.deleteUser);

module.exports = router;