const express = require("express");
const router = express.Router();
const {
  getActiveTools,
} = require("../../../controllers/web/DataEntry/getActiveTools");

router.post("/", getActiveTools);

module.exports = router;
