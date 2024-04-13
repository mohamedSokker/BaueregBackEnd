const express = require("express");
const router = express.Router();
const { getTargetCode } = require("../controllers/getTargetCode");

router.post("/", getTargetCode);

module.exports = router;
