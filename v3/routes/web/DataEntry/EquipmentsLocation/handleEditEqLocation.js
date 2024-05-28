const express = require("express");
const router = express.Router();
const {
  handleEditEqLocation,
} = require("../../../../controllers/web/DataEntry/EquipmentsLocation/handleEditEqLocation");

router.put("/:id", handleEditEqLocation);

module.exports = router;
