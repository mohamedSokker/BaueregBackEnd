const express = require("express");
const router = express.Router();
const { deleteTask } = require("../controllers/deleteTask");

router.post("/", deleteTask);

module.exports = router;
