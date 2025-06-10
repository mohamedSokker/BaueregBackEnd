const express = require("express");
const router = express.Router();
const {
  getTargetTasks,
} = require("../../../controllers/web/TaskManager/getTargetTasks");

router.post("/", getTargetTasks);

module.exports = router;
