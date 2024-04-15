const express = require("express");
const router = express.Router();
const {
  productionTrench,
} = require("../../../controllers/web/Dashboard/prodTrench");

router.get("/", productionTrench);

module.exports = router;
