const express = require("express");
const router = express.Router();
const { deleteFile } = require("../controllers/deleteFile");

router.post("/", deleteFile);

module.exports = router;
