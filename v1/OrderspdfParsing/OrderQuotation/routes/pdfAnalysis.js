const express = require("express");
const router = express.Router();

const { pdfAnalysis } = require("../controllers/pdfAnalysis");

router.get("/", pdfAnalysis);

module.exports = router;
