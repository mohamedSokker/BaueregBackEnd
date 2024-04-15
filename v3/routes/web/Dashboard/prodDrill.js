const express = require("express");
const router = express.Router();
const {
  productionDrill,
} = require("../../../controllers/web/Dashboard/prodDrill");

router.get("/", productionDrill);

module.exports = router;
