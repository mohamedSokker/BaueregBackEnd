const express = require("express");
const router = express.Router();
const { getItems } = require("../controllers/getItems");

router.post("/", getItems);

module.exports = router;
