const express = require("express");
const router = express.Router();
const {
  addOrder,
} = require("../../../../../controllers/web/DataEntry/Orders/OrderInvoice/addOrder");

router.post("/", addOrder);

module.exports = router;
