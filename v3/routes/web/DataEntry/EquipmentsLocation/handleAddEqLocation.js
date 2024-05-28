const express = require("express");
const router = express.Router();
const {
  handleAddEqLocation,
} = require("../../../../controllers/web/DataEntry/EquipmentsLocation/handleAddEquipmentLocation");

router.post("/", handleAddEqLocation);

module.exports = router;
