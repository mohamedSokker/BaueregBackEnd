const express = require("express");
const router = express.Router();
const {
  logic,
} = require("../../../controllers/web/Transportation/AddEquipmentsTrans");

router.post("/", logic);

module.exports = router;
