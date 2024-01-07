const express = require("express");
const router = express.Router();
const { editEqsTrans } = require("../controllers/EditEqsTrans");

router.put("/:id", editEqsTrans);

module.exports = router;
