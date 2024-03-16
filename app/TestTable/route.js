const express = require("express");
const router = express.Router();
const {
  getAllTest,
  getOneTest,
  addOneTest,
  addManyTest,
  updateOneTest,
  updateManyTest,
  deleteOneTest,
  deleteManyTest,
} = require("./controller");

router.get("/", getAllTest);
router.get("/:id", getOneTest);
router.post("/", addOneTest);
router.post("/Many", addManyTest);
router.put("/Many", updateManyTest);
router.put("/:id", updateOneTest);
router.delete("/Many", deleteManyTest);
router.delete("/:id", deleteOneTest);

module.exports = router;
