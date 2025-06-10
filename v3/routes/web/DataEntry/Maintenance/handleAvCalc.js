const express = require("express");
const router = express.Router();
const {
  addMaintenance,
} = require("../../../../controllers/web/DataEntry/Maintenance/handleAvCalc");

router.post("/", addMaintenance);

module.exports = router;
