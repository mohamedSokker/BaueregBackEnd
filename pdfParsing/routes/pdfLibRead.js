const express = require("express");
const router = express.Router();

const { pdfLibRead } = require("../controllers/pdfLibRead");

router.get("/", pdfLibRead);

module.exports = router;
