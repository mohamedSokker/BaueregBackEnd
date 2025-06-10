const express = require("express");
const router = express.Router();
const { HomeConsumptions } = require("../../../controllers/web/Home/homeCons");

router.post("/", HomeConsumptions);

module.exports = router;
