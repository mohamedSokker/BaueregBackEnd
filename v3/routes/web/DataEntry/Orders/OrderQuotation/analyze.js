const express = require("express");
const router = express.Router();
const {
  pdfAnalysis,
} = require("../../../../../controllers/web/DataEntry/Orders/OrderQuotation/analyze");

router.post("/", pdfAnalysis);

module.exports = router;
