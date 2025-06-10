const express = require("express");
const router = express.Router();
const {
  addOrder,
} = require("../../../../../controllers/web/DataEntry/Orders/OrderConfirmation/addOrder");

router.post("/", addOrder);

module.exports = router;
