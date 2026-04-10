const express = require("express");
const router = express.Router();

const controller =
require("../controllers/referenceController");
const auth = require("../middleware/authMiddleware");

router.post("/", auth, controller.addReference);//add
router.get("/:id", controller.getReferenceById);//get by id
router.put("/:id", auth, controller.updateReference);//update
router.delete("/:id", auth, controller.deleteReference);//delete
router.get("/", controller.getReferences);//get all


module.exports = router;