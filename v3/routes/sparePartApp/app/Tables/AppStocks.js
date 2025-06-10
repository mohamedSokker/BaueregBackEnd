const express = require("express");
const router = express.Router();
const {
  getAllAppStocks,
  getAppStocks,
  addAppStocks,
  updateAppStocks,
  deleteAppStocks,
} = require("../../../../controllers/sparePartApp/app/Tables/AppStocks");

// router.use((req, res, next) => {
//   console.log("middleware");
//   next();
// });

router.get("/", getAllAppStocks);

router.get("/:id", getAppStocks);

router.post("/", addAppStocks);

router.put("/:id", updateAppStocks);

router.delete("/:id", deleteAppStocks);

module.exports = router;
