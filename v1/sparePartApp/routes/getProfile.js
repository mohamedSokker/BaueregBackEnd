const express = require("express");
const router = express.Router();
const { getProfile } = require("../controllers/getProfile");

router.post("/", getProfile);

module.exports = router;
