const express = require("express");
const router = express.Router();
const {
  oilConsumption,
} = require("../../../controllers/web/Dashboard/oilCons");

router.get("/", oilConsumption);

module.exports = router;
