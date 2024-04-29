const express = require("express");
const router = express.Router();
const {
  getTargetOrder,
} = require("../../../../controllers/sparePartApp/app/helpers/GetTargetOrder");

router.post("/", getTargetOrder);

module.exports = router;
