const express = require("express");
const router = express.Router();
const { getAllAppStocks } = require("../controllers/AppStocks");
const { getAppStocks } = require("../controllers/AppStocks");
const { addAppStocks } = require("../controllers/AppStocks");
const { updateAppStocks } = require("../controllers/AppStocks");
const { deleteAppStocks } = require("../controllers/AppStocks");

router.use((req, res, next) => {
  console.log("middleware");
  next();
});

router.get("/", getAllAppStocks);

router.get("/:id", getAppStocks);

router.post("/", addAppStocks);

router.put("/:id", updateAppStocks);

router.delete("/:id", deleteAppStocks);

module.exports = router;
