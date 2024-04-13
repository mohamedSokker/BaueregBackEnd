const express = require("express");
const router = express.Router();
const {
  getAllAvailability,
  getOneAvailability,
  addOneAvailability,
  addManyAvailability,
  updateOneAvailability,
  updateManyAvailability,
  deleteOneAvailability,
  deleteManyAvailability,
} = require("./controller");

router.get("/", getAllAvailability);
router.get("/:id", getOneAvailability);
router.post("/", addOneAvailability);
router.post("/Many", addManyAvailability);
router.put("/Many", updateManyAvailability);
router.put("/:id", updateOneAvailability);
router.delete("/Many", deleteManyAvailability);
router.delete("/:id", deleteOneAvailability);

module.exports = router;
