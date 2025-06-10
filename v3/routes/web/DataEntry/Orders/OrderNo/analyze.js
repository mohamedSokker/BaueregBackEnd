const express = require("express");
const router = express.Router();
const {
  pdfAnalysis,
} = require("../../../../../controllers/web/DataEntry/Orders/OrderNo/analyze");

router.post("/", pdfAnalysis);

module.exports = router;
