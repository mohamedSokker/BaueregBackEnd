const express = require("express");
const router = express.Router();
const { handleTasks } = require("../controllers/handleTasks");

router.post("/", handleTasks);

module.exports = router;
