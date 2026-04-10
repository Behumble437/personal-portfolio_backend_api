const express = require("express");
const router = express.Router();

const controller =
require("../controllers/projectController");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, controller.addProject);//add
router.get("/:id", controller.getProjectById);//get by id
router.put("/:id", auth, controller.updateProject);//update
router.delete("/:id", auth, controller.deleteProject);//delete
router.get("/", controller.getProjects);//get all

module.exports = router;