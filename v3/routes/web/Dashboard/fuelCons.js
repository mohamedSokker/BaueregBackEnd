const express = require("express");
const router = express.Router();
const {
  fuelConsumption,
} = require("../../../controllers/web/Dashboard/fuelCons");

router.get("/", fuelConsumption);

module.exports = router;
