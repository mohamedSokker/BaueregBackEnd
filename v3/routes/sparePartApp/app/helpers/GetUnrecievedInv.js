const express = require("express");
const router = express.Router();
const {
  getUnrecievedInv,
} = require("../../../../controllers/sparePartApp/app/helpers/GetUnrecievedInv");

router.post("/", getUnrecievedInv);

module.exports = router;
