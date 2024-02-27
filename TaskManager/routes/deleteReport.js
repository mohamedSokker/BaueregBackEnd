const express = require("express");
const router = express.Router();
const { deleteReport } = require("../controllers/deleteReport");

router.post("/", deleteReport);

module.exports = router;
