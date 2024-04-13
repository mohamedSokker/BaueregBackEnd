const express = require("express");
const router = express.Router();

const { pdfParse } = require("../controllers/pdfParse");

router.get("/", pdfParse);

module.exports = router;
