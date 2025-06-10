const express = require("express");
const router = express.Router();
const {
  orderIncomplete,
} = require("../../../controllers/web/OrdersAnalysis/orderIncomplete");

router.get("/", orderIncomplete);

module.exports = router;
