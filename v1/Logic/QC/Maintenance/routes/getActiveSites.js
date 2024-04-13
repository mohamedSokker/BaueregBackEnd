const express = require("express");
const router = express.Router();

const { getActiveSites } = require("../controllers/getActiveSites");

router.post("/", getActiveSites);

module.exports = router;
