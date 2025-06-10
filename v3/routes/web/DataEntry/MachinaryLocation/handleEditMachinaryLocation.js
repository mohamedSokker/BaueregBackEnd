const express = require("express");
const router = express.Router();
const {
  handleEditMachinaryLocation,
} = require("../../../../controllers/web/DataEntry/MachinaryLocation/handleEditMachinaryLocation");

router.put("/:id", handleEditMachinaryLocation);

module.exports = router;
