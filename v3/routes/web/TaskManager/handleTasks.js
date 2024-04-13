const express = require("express");
const router = express.Router();
const {
  handleTasks,
} = require("../../../controllers/web/TaskManager/handleTasks");

router.post("/", handleTasks);

module.exports = router;
