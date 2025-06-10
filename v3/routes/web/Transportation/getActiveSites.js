const express = require("express");
const router = express.Router();
const {
  getActiveSites,
} = require("../../../controllers/web/Transportation/getActiveSites");

router.post("/", getActiveSites);

module.exports = router;
