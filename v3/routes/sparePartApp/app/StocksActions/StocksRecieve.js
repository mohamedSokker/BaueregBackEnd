const express = require("express");
const router = express.Router();

const {
  stocksRecieve,
} = require("../../../../controllers/sparePartApp/app/StocksActions/StocksRecieve");

// router.use((req, res, next) => {
//   console.log("middleware");
//   next();
// });

router.post("/", stocksRecieve);

module.exports = router;
