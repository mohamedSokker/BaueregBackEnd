const express = require("express");
const router = express.Router();
const { getUsers } = require("../../../controllers/web/TaskManager/getUsers");

router.get("/", getUsers);

module.exports = router;
