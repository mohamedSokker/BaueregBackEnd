const express = require("express");
const router = express.Router();

const {
  stocksExchange,
} = require("../../../../controllers/sparePartApp/app/StocksActions/StocksExchange");

// router.use((req, res, next) => {
//   console.log("middleware");
//   next();
// });

router.post("/", stocksExchange);

module.exports = router;
