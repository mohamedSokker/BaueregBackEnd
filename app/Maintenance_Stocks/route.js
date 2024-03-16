const express = require("express");
const router = express.Router();
const {
  getAllMaintenance_Stocks,
  getOneMaintenance_Stocks,
  addOneMaintenance_Stocks,
  addManyMaintenance_Stocks,
  updateOneMaintenance_Stocks,
  updateManyMaintenance_Stocks,
  deleteOneMaintenance_Stocks,
  deleteManyMaintenance_Stocks,
} = require("./controller");

router.get("/", getAllMaintenance_Stocks);
router.get("/:id", getOneMaintenance_Stocks);
router.post("/", addOneMaintenance_Stocks);
router.post("/Many", addManyMaintenance_Stocks);
router.put("/Many", updateManyMaintenance_Stocks);
router.put("/:id", updateOneMaintenance_Stocks);
router.delete("/Many", deleteManyMaintenance_Stocks);
router.delete("/:id", deleteOneMaintenance_Stocks);

module.exports = router;
