const express = require("express");
const router = express.Router();
const { getTargetOrder } = require("../controllers/getTargetOrder");

router.post("/", getTargetOrder);

module.exports = router;
