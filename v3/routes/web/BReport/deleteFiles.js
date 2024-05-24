const express = require("express");
const router = express.Router();
const { deleteFile } = require("../../../controllers/web/BReport/deleteFiles");

router.post("/", deleteFile);

module.exports = router;
