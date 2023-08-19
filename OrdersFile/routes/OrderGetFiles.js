const express = require("express");
const router = express.Router();

const { getFiles } = require("../controllers/OrderGetFiles");

router.get("/", getFiles);

module.exports = router;
