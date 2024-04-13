const express = require("express");
const router = express.Router();
const {
  getEquipments,
} = require("../../../controllers/web/TaskManager/getEquipments");

router.get("/", getEquipments);

module.exports = router;
