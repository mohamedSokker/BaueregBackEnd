const express = require("express");
const router = express.Router();
const {
  getItems,
} = require("../../../../controllers/sparePartApp/app/helpers/GetItems");

router.post("/", getItems);

module.exports = router;
