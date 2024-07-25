const express = require("express");
const router = express.Router();
const {
  handleAddReceivedInvoice,
} = require("../../../../controllers/web/DataEntry/Received_Invoice/handleAddReceivedInvoice");

router.post("/", handleAddReceivedInvoice);

module.exports = router;
