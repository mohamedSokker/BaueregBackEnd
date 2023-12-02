const express = require("express");
const router = express.Router();
const { getUserEquipments } = require("../controllers/getUserEquipments");

router.post("/", getUserEquipments);

module.exports = router;
