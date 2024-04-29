const express = require("express");
const router = express.Router();
const {
  getActiveSites,
} = require("../../../../controllers/sparePartApp/app/helpers/GetActiveSites");

console.log(`Get Active Site End Point`);

router.post("/", getActiveSites);

module.exports = router;
