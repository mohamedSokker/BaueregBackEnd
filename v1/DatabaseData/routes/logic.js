const express = require("express");
const router = express.Router();
const { logic, getAll } = require("../controllers/logic");

router.get("/", logic);

module.exports = router;
