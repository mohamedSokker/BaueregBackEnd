const express = require("express");
const router = express.Router();
const {
  getAllEq,
} = require("../../controllers/maintenanceMobileApp/GetAllEquipments");

router.use((req, res, next) => {
  console.log("get All Eq middleware");
  next();
});

router.get("/", getAllEq);

module.exports = router;
