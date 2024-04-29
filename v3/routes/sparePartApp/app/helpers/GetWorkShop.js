const express = require("express");
const router = express.Router();
const {
  getWorkshops,
} = require("../../../../controllers/sparePartApp/app/helpers/GetWorkShop");

router.post("/", getWorkshops);

module.exports = router;
