const express = require("express");
const router = express.Router();
const {
  getAllMaintenance,
  getOneMaintenance,
  addOneMaintenance,
  addManyMaintenance,
  updateOneMaintenance,
  updateManyMaintenance,
  deleteOneMaintenance,
  deleteManyMaintenance,
} = require("./controller");

router.get("/", getAllMaintenance);
router.get("/:id", getOneMaintenance);
router.post("/", addOneMaintenance);
router.post("/Many", addManyMaintenance);
router.put("/Many", updateManyMaintenance);
router.put("/:id", updateOneMaintenance);
router.delete("/Many", deleteManyMaintenance);
router.delete("/:id", deleteOneMaintenance);

module.exports = router;
