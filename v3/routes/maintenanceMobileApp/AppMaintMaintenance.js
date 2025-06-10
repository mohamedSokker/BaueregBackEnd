const express = require("express");
const router = express.Router();
const {
  getAllAppMaintMaintenance,
  getAppMaintMaintenance,
  addAppMaintMaintenance,
  updateAppMaintMaintenance,
  deleteAppMaintMaintenance,
} = require("../../controllers/maintenanceMobileApp/AppMaintMaintenance");

router.use((req, res, next) => {
  console.log("AppMaintMaintenance middleware");
  next();
});

router.get("/", getAllAppMaintMaintenance);

router.get("/:id", getAppMaintMaintenance);

router.post("/", addAppMaintMaintenance);

router.put("/:id", updateAppMaintMaintenance);

router.delete("/:id", deleteAppMaintMaintenance);

module.exports = router;
