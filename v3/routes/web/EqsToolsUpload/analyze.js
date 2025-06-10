const express = require("express");
const router = express.Router();
const { Analyze } = require("../../../controllers/web/EqsToolsUpload/analyze");

router.post("/", Analyze);

module.exports = router;
