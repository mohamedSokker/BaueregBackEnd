const express = require("express");
const router = express.Router();
const { AddWorkshop } = require("../controllers/AddWorkshop");

router.post("/", AddWorkshop);

module.exports = router;
