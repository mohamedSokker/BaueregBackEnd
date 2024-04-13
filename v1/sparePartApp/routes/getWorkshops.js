const express = require("express");
const router = express.Router();
const { getWorkshops } = require("../controllers/getWorkshops");

router.post("/", getWorkshops);

module.exports = router;
