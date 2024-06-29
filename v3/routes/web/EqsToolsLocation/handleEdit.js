const express = require("express");
const router = express.Router();
const {
  handleEdit,
} = require("../../../controllers/web/EqsToolsLocation/handleEdit");

router.post("/", handleEdit);

module.exports = router;
