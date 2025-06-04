const express = require("express");
const router = express.Router();
const { HomeLocTrGB } = require("../../../controllers/web/Home/homeLocTrGB");

router.post("/", HomeLocTrGB);

module.exports = router;
