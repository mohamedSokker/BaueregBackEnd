const express = require("express");
const router = express.Router();
const { HomeDailyWH } = require("../../../controllers/web/Home/homeDailyWH");

router.post("/", HomeDailyWH);

module.exports = router;
