const express = require("express");
const router = express.Router();
const { getEquipments } = require("../controllers/getEquipments");

router.get("/", getEquipments);

module.exports = router;
