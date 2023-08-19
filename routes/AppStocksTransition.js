const express = require("express");
const router = express.Router();
const {
  getAllAppStocksTransition,
} = require("../controllers/AppStocksTransition");
const {
  getAppStocksTransition,
} = require("../controllers/AppStocksTransition");
const {
  addAppStocksTransition,
} = require("../controllers/AppStocksTransition");
const {
  updateAppStocksTransition,
} = require("../controllers/AppStocksTransition");
const {
  deleteAppStocksTransition,
} = require("../controllers/AppStocksTransition");

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
