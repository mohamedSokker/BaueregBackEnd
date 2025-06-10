const express = require("express");
const router = express.Router();
const { allData } = require("../../../controllers/web/Dashboard/allData");

router.get("/", allData);

module.exports = router;
