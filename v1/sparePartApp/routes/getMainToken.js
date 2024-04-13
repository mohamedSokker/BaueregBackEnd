const express = require("express");
const router = express.Router();
const { getMainToken } = require("../controllers/getMainToken");

router.post("/", getMainToken);

module.exports = router;
