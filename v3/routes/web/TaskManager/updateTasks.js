const express = require("express");
const router = express.Router();
const {
  updateTasks,
} = require("../../../controllers/web/TaskManager/updateTasks");

router.post("/", updateTasks);

module.exports = router;
