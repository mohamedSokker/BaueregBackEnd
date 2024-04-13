const express = require("express");
const router = express.Router();
const { logic } = require("../controllers/AddEquipmentsTrans");

router.post("/", logic);

module.exports = router;
