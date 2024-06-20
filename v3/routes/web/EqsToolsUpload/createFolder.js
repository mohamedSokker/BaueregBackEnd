const express = require("express");
const router = express.Router();
const {
  createFolder,
} = require("../../../controllers/web/EqsToolsUpload/createFolder");

router.post("/", createFolder);

module.exports = router;
