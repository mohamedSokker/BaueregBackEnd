const express = require("express");
const router = express.Router();
const {
  getActiveInvoice,
} = require("../../../controllers/web/DataEntry/getActiveInvoice");

router.post("/", getActiveInvoice);

module.exports = router;
