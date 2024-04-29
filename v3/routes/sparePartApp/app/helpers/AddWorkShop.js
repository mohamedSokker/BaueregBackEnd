const express = require("express");
const router = express.Router();
const {
  AddWorkshop,
} = require("../../../../controllers/sparePartApp/app/helpers/AddWorkShop");

router.post("/", AddWorkshop);

module.exports = router;
