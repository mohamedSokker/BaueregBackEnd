const express = require("express");
const router = express.Router();
const { getEquipments } = require("../controllers/logic");

router.use((req, res, next) => {
  console.log("app get Equipments middleware");
  next();
});

router.post("/", getEquipments);

module.exports = router;
