const express = require("express");
const router = express.Router();
const {
  orderStatus,
} = require("../../../controllers/web/OrdersAnalysis/orderStatus");

router.get("/", orderStatus);

module.exports = router;
