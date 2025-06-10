const express = require("express");
const router = express.Router();
const { readExcel } = require("../../../controllers/web/DataEntry/readExcel");

router.get("/", readExcel);

module.exports = router;
