const express = require("express");
const router = express.Router();
const {
  getAllmanageUsers,
  getmanageUsers,
  addmanageUsers,
  updatemanageUsers,
  deletemanageUsers,
} = require("../../controllers/maintenanceMobileApp/appManageUsers");

router.use((req, res, next) => {
  console.log("app manage Users middleware");
  next();
});

router.get("/", getAllmanageUsers);

router.get("/:id", getmanageUsers);

router.post("/", addmanageUsers);

router.put("/:id", updatemanageUsers);

router.delete("/:id", deletemanageUsers);

module.exports = router;
