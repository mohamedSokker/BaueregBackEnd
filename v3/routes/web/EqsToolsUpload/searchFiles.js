const express = require("express");
const router = express.Router();
const {
  searchFiles,
} = require("../../../controllers/web/EqsToolsUpload/searchFiles");

router.post("/", searchFiles);

module.exports = router;
