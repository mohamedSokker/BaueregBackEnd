const express = require("express");
const router = express.Router();
const {
  uploadItems,
} = require("../../../controllers/web/OilSamplesAnalyzed/uploadFiles");

router.post("/", uploadItems);

module.exports = router;
