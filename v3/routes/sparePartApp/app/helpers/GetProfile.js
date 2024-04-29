const express = require("express");
const router = express.Router();
const {
  getProfile,
} = require("../../../../controllers/sparePartApp/app/helpers/GetProfile");

router.post("/", getProfile);

module.exports = router;
