const express = require("express");
const router = express.Router();
const {
  getBreakdowns,
} = require("../../../controllers/web/DataEntry/getBreakdowns");

router.post("/", getBreakdowns);

module.exports = router;
