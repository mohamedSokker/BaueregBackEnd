const express = require("express");
const router = express.Router();
const {
  getUserEquipments,
} = require("../../../../controllers/sparePartApp/app/helpers/GetUserEqs");

router.post("/", getUserEquipments);

module.exports = router;
