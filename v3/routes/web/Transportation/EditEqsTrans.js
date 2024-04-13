const express = require("express");
const router = express.Router();
const {
  editEqsTrans,
} = require("../../../controllers/web/Transportation/EditEqsTrans");

router.put("/:id", editEqsTrans);

module.exports = router;
