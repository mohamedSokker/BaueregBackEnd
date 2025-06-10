const express = require("express");
const router = express.Router();
const { HomeWire } = require("../../../controllers/web/Home/homeWIre");

router.post("/", HomeWire);

module.exports = router;
