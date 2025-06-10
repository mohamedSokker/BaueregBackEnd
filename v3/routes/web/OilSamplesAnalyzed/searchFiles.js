const express = require("express");
const router = express.Router();
const {
  searchFiles,
} = require("../../../controllers/web/OilSamplesAnalyzed/seachFiles");

router.post("/", searchFiles);

module.exports = router;
