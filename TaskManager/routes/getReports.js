const express = require("express");
const router = express.Router();
const { getReports } = require("../controllers/getReports");

router.get("/", getReports);

module.exports = router;
