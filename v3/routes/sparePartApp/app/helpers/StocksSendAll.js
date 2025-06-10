const express = require("express");
const router = express.Router();

const {
  stocksSendAll,
} = require("../../../../controllers/sparePartApp/app/helpers/StocksSendAll");

router.post("/", stocksSendAll);

module.exports = router;
