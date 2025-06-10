const express = require("express");
const router = express.Router();
const {
  getItem,
} = require("../../../../controllers/sparePartApp/app/helpers/GetItem");

router.post("/", getItem);

module.exports = router;
