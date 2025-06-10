const express = require("express");
const router = express.Router();
const {
  HomeOilConsumption,
} = require("../../../controllers/web/Home/homeOilCons");

router.post("/", HomeOilConsumption);

module.exports = router;
