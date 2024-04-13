const express = require("express");
const router = express.Router();
const {
  handleAvPlan,
} = require("../../../../controllers/web/DataEntry/Availability_Plan/handleAvPlan");

router.post("/", handleAvPlan);

module.exports = router;
