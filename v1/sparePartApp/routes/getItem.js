const express = require("express");
const router = express.Router();
const { getItem } = require("../controllers/getItem");

router.post("/", getItem);

module.exports = router;
