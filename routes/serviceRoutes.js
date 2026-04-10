const express = require("express");
const router = express.Router();

const controller =
require("../controllers/serviceController");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, controller.addService);//add
router.get("/:id", controller.getServiceById);//get by id
router.put("/:id", auth, controller.updateService);//update
router.delete("/:id", auth, controller.deleteService);//delete
router.get("/", controller.getServices);//get all

module.exports = router;