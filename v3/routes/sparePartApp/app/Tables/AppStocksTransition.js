const express = require("express");
const router = express.Router();
const {
  getAllAppStocksTransition,
  getAppStocksTransition,
  addAppStocksTransition,
  updateAppStocksTransition,
  deleteAppStocksTransition,
} = require("../../../../controllers/sparePartApp/app/Tables/AppStocksTransition");

router.use((req, res, next) => {
  console.log("middleware");
  next();
});

router.get("/", getAllAppStocksTransition);

router.get("/:id", getAppStocksTransition);

router.post("/", addAppStocksTransition);

router.put("/:id", updateAppStocksTransition);

router.delete("/:id", deleteAppStocksTransition);

module.exports = router;
