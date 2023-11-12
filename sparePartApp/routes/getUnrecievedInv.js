const express = require("express");
const router = express.Router();
const { getUnrecievedInv } = require("../controllers/getUnrecievedInv");

router.post("/", getUnrecievedInv);

module.exports = router;
