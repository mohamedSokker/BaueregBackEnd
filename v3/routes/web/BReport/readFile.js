const express = require("express");
const router = express.Router();
const { readFile } = require("../../../controllers/web/BReport/readFile");

router.post("/", readFile);

module.exports = router;
