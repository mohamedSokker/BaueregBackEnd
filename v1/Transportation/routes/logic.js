const express = require("express");
const router = express.Router();
const { getActiveSites } = require("../controllers/logic");

router.post("/", getActiveSites);

module.exports = router;
