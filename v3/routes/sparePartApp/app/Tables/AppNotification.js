const express = require("express");
const router = express.Router();
const {
  getAllAppNotification,
  getAppNotification,
  addAppNotification,
  updateAppNotification,
  deleteAppNotification,
} = require("../../../../controllers/sparePartApp/app/Tables/AppNotification");

// router.use((req, res, next) => {
//   console.log("middleware");
//   next();
// });

router.get("/", getAllAppNotification);

router.get("/:id", getAppNotification);

router.post("/", addAppNotification);

router.put("/:id", updateAppNotification);

router.delete("/:id", deleteAppNotification);

module.exports = router;
