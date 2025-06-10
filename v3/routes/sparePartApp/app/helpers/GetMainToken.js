const express = require("express");
const router = express.Router();
const {
  getMainToken,
} = require("../../../../controllers/sparePartApp/app/helpers/GetMainToken");

router.post("/", getMainToken);

module.exports = router;
