const express = require("express");
const router = express.Router();
const { HomePerMaint } = require("../../../controllers/web/Home/homePerMaint");

router.post("/", HomePerMaint);

module.exports = router;
