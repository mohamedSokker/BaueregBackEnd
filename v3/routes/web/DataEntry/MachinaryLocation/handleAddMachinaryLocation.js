const express = require("express");
const router = express.Router();
const {
  handleAddMachinaryLocation,
} = require("../../../../controllers/web/DataEntry/MachinaryLocation/handleAddMachinaryLocation");

router.post("/", handleAddMachinaryLocation);

module.exports = router;
