const express = require("express");
const router = express.Router();
const {
  deleteFile,
} = require("../../../controllers/web/TaskManager/deleteFile");

router.post("/", deleteFile);

module.exports = router;
