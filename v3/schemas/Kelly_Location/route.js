const express = require("express");
const router = express.Router();
const {
  getAllKelly_Location,
  getOneKelly_Location,
  addOneKelly_Location,
  addManyKelly_Location,
  updateOneKelly_Location,
  updateManyKelly_Location,
  deleteOneKelly_Location,
  deleteManyKelly_Location,
} = require("./controller");

router.get("/", getAllKelly_Location);
router.get("/:id", getOneKelly_Location);
router.post("/", addOneKelly_Location);
router.post("/Many", addManyKelly_Location);
router.put("/Many", updateManyKelly_Location);
router.put("/:id", updateOneKelly_Location);
router.delete("/Many", deleteManyKelly_Location);
router.delete("/:id", deleteOneKelly_Location);

module.exports = router;
