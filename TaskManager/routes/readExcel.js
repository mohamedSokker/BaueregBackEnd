const express = require("express");
const router = express.Router();
const { readExcel } = require("../controllers/readExcel");

router.post("/", readExcel);

module.exports = router;
