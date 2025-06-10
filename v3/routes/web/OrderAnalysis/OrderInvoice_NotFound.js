const express = require("express");
const router = express.Router();
const {
  OrderInvoice_NotFound,
} = require("../../../controllers/web/OrdersAnalysis/OrderInvoice_NotFound");

router.get("/", OrderInvoice_NotFound);

module.exports = router;
