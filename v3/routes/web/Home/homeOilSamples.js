const express = require("express");
const router = express.Router();
const {
  HomeOilSamples,
} = require("../../../controllers/web/Home/homeOilSamples");

router.post("/", HomeOilSamples);

module.exports = router;
