const express = require("express");
const router = express.Router();

const { mongoBackup } = require("../controllers/mongoBackup");

router.get("/", mongoBackup);

module.exports = router;
