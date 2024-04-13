const express = require("express");
const router = express.Router();
const {
  getEquipments,
} = require("../../controllers/maintenanceMobileApp/getEquipments");

router.use((req, res, next) => {
  console.log("app get Equipments middleware");
  next();
});

router.post("/", getEquipments);

module.exports = router;
