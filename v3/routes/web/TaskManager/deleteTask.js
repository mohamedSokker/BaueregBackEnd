const express = require("express");
const router = express.Router();
const {
  deleteTask,
} = require("../../../controllers/web/TaskManager/deleteTask");

router.post("/", deleteTask);

module.exports = router;
