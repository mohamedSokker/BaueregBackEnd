const express = require("express");
const router = express.Router();
const {
  getActiveSites,
} = require("../../../controllers/web/Transportation/logic");

router.post("/", getActiveSites);

module.exports = router;
