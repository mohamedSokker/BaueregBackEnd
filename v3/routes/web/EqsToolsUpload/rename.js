const express = require("express");
const router = express.Router();
const {
  renameFile,
} = require("../../../controllers/web/EqsToolsUpload/rename");

router.post("/", renameFile);

module.exports = router;
