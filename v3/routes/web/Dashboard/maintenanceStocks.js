const express = require("express");
const router = express.Router();
const {
  maintStocks,
} = require("../../../controllers/web/Dashboard/maintenanceStocks");

router.get("/", maintStocks);

module.exports = router;
