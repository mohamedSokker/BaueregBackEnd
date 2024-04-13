const express = require("express");
const router = express.Router();
const { getTasks } = require("../../../controllers/web/TaskManager/getTasks");

router.get("/", getTasks);

module.exports = router;
