const express = require("express");
const router = express.Router();
const {
  getTargetCode,
} = require("../../../../controllers/sparePartApp/app/helpers/GetTagetCode");

router.post("/", getTargetCode);

module.exports = router;
