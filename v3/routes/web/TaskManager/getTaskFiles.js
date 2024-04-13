const express = require("express");
const router = express.Router();
const {
  getTaskFiles,
} = require("../../../controllers/web/TaskManager/getTaskFiles");

router.post("/", getTaskFiles);

module.exports = router;
